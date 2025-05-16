const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const session = require('express-session');
const passport = require('passport');
const { OIDCStrategy } = require('passport-azure-ad');
require('dotenv').config();

const port = 5000;


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
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


passport.use(new OIDCStrategy({
  identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
  clientID: process.env.AZURE_CLIENT_ID,
  clientSecret: process.env.AZURE_CLIENT_SECRET,
  responseType: 'code',
  responseMode: 'query',
  redirectUrl: 'http://localhost:5000/auth/azuread/callback',
  allowHttpForRedirectUrl: true,
  scope: ['profile', 'email', 'openid'],
  passReqToCallback: false
},
function(iss, sub, profile, accessToken, refreshToken, done) {
  if (!profile.oid) {
    return done(new Error("No OID found"), null);
  }
  return done(null, profile);
}
));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get('/auth/azuread', passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }));

app.get('/auth/azuread/callback',
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/',
    successRedirect: 'http://localhost:3000',
  })
);

app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.post('/compile', async (req, res) => {
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
