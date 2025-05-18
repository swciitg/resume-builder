import React from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const Instructions = ({ setInstructions }) => {
    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => setInstructions(false)}
                    className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                    aria-label="Go back"
                >
                    View latex code
                </button>
                <div className="sticky top-0 z-10 flex justify-end pt-4">
                    <button
                        className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        onClick={() => alert("No code to copy here")}
                        title="No code to copy here"
                        aria-label="No code to copy"
                    >
                        <ClipboardDocumentIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>
                </div>
            </div>

            <h1 className="text-2xl font-semibold mb-6">How to Customize Your Resume Using LaTeX</h1>

            <div className="space-y-6 text-gray-900 dark:text-gray-100 text-base leading-relaxed">
                <section>
                    <p>
                        You can personalize your resume by using simple LaTeX commands. Just add them to the inputs to get the results:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-3">
                        <h2 className="font-bold">To make a word or sentence: </h2>
                        <li>
                            <b><u>underlined</u>:</b> Write <code>\underline{"{your text}"}</code>.
                            <br />
                            <em>Example:</em> To underline <code>important</code>, write <code>\underline{"{important}"}</code>.
                        </li>
                        <li>
                            <b><i>italicized</i>:</b> Write <code>\textit{"{your text}"}</code>.
                            <br />
                            <em>Example:</em> To italicize <code>note</code>, write <code>\textit{"{note}"}</code>.
                        </li>
                        <li>
                            <b><strong>bold</strong>:</b> Write <code>\textbf{"{your text}"}</code>.
                            <br />
                            <em>Example:</em> To bold <code>important</code>, write <code>\textbf{"{important}"}</code>.
                        </li>
                        <li>
                            <b>To start a new line (within the same paragraph):</b> Use double backslash <code>\\</code>.
                            <br />
                            <em>Example:</em> Write <code>First line \\ Second line</code> to move the second line down.
                        </li>
                        <li>
                            <b>To add clickable links (hyperlinks):</b> Use <code>\href{"{URL}"}{"{text to show}"}</code>.
                            <br />
                            <em>Example:</em> Write <code>\href{"https://example.com"}{"My Website"}</code> to show a clickable link named "My Website".
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">How to Write Special Characters</h2>
                    <p>
                        Some symbols have special meaning in LaTeX. To show them as normal characters, you need to add a backslash (<code>\</code>) before them.
                    </p>
                    <table className="table-auto border-collapse border border-gray-300 dark:border-gray-600 mt-3 w-full text-sm">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="border border-gray-300 dark:border-gray-600 px-3 py-1 text-left">Symbol to show</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-3 py-1 text-left">How to write in LaTeX</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-3 py-1 text-left">Example</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">#</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">
                                    <code>\#</code>
                                </td>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">\# means #</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">$</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">
                                    <code>\$</code>
                                </td>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">\$ means $</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">%</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">
                                    <code>\%</code>
                                </td>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">\% means %</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">&amp;</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">
                                    <code>\&amp;</code>
                                </td>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">\&amp; means &amp;</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">^</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">
                                    <code>\^</code>
                                </td>
                                <td className="border border-gray-300 dark:border-gray-600 px-3 py-1">\^ means ^ (caret)</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">Comments in LaTeX</h2>
                    <p>
                        To add comments that <em>do not appear</em> in your final resume, start the line with <code>%</code>. It’s useful for notes or reminders.
                    </p>
                    <em>Example:</em> <code>% This line is a comment and will not be shown</code>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">Example to Try</h2>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto whitespace-pre-wrap">
                        {`\\textbf{This text is bold} and \\underline{this text is underlined} \\\\
Visit my \\href{https://github.com/username}{GitHub} profile. % This is a comment`}
                    </pre>
                    <p>Try editing your resume using these commands in the input fields to make it look the way you want!</p>
                </section>
            </div>
        </div>
    );
};

export default Instructions;
