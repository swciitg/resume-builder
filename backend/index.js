const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const session = require('express-session');
const passport = require('passport');
const userRoute = require("./route/user-route");
const User = require('./schema/userSchema');
const { OIDCStrategy } = require('passport-azure-ad');

require('dotenv').config();
const db = require('./dbConfig');

const port = 5000;


app.use(cors({
  origin: `${process.env.REACT_APP_CLIENT_URL}`,
  methods: ['GET', 'POST' , 'PUT', 'DELETE'],
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(express.json({ limit: '5mb' }));
app.use(passport.initialize());
app.use(passport.session());

db.main().catch(err => console.log(err));

passport.use(new OIDCStrategy({
  identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
  clientID: process.env.AZURE_CLIENT_ID,
  clientSecret: process.env.AZURE_CLIENT_SECRET,
  responseType: 'code',
  responseMode: 'query',
  redirectUrl: `${process.env.REDIRECT_URI}`,
  allowHttpForRedirectUrl: true,
  scope: ['profile', 'email', 'openid'],
  passReqToCallback: false
},
async function(iss, sub, profile, accessToken, refreshToken, done) {
  if (!profile.oid) {
    return done(new Error("No OID found"), null);
  }
  const user = await User.findOne({ userId: profile.oid });
  if (!user) {
    const newUser = new User({
      userId: profile.oid,
      personalInfo: {
        name: profile.displayName,
        email: profile._json.email,
        secondaryEmail: "",
        rollNumber: '',
        courseBranch: '',
        contactNumber: '',
        githubProfile: '',
        linkedinProfile: '',
        website: ''
      },
    });
    await newUser.save();
  }
  return done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user.oid); // or user.userId depending on your schema
});

passport.deserializeUser(async (oid, done) => {
  try {
    const user = await User.findOne({ userId: oid });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.get('/auth/azuread', passport.authenticate('azuread-openidconnect', {failureRedirect: '/',prompt:'login',
    successRedirect: `${process.env.REACT_APP_CLIENT_URL}/resume-builder/`}));


app.get('/auth/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });
});



app.get('/auth/azuread/callback',
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/',
    successRedirect: `${process.env.REACT_APP_CLIENT_URL}/resume-builder`,
  })
);

app.get('/api/user', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const user = await User.findOne({ userId: req.user.userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ authenticated: true, user });
    } catch (err) {
      res.status(500).json({ authenticated: false, error: "Server error" });
    }
  } else {
    res.json({ authenticated: false });
  }
});




app.use("/saveprogress",userRoute);
app.post('/compile', async (req, res) => {
  // console.log(req.body);
  try {
    const latexCode = req.body.latexCode;
    const fileName = 'resume';
    
    if (!latexCode) {
      return res.status(400).send('No LaTeX code provided');
    }
    fs.writeFileSync(`${fileName}.tex`, latexCode);

    exec(`pdflatex -interaction=nonstopmode ${fileName}.tex`, (err, stdout, stderr) => {
      
      const pdf = fs.readFileSync(`${fileName}.pdf`);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
      res.send(pdf);

      ['aux', 'log', 'pdf', 'tex'].forEach(ext => fs.unlinkSync(`${fileName}.${ext}`));
    });
  } catch (e) {
    console.error('Internal Server Error:', e);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => console.log(`Backend running on port ${port}`));