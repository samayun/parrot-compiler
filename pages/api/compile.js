const shell = require('child_process');

export default function handler(req, res) {
  try {
  const code = req.body.code;
  // Compile
  shell.execSync(`cd public && echo ${JSON.stringify(code)} > hello.c`);
   
  // Get output
  const output = shell.execSync(`cd public && gcc hello.c -o hello.out && ./hello.out`);

  return res.status(200).json({ error: false, message: "Successfully compiled" , result: output.toString()})

  } catch (error) {
    return res.status(400).json({ error: true, message: "FAILED TO COMPILE", result: "", errorData: error })
  }
}
