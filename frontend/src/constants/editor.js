export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export const LANGUAGES = [
 'javascript' ,
 'typescript',
'python' ,
 'java',
  'csharp',
  'php',
  'cpp',
  'c',
  'css',
  'html',
  'json',
  'mysql',
  'dart',
  'solidity',
  'rust',
  'dockerfile',
  'powershell'
]



export const CODE_SNIPPETS = {
 'javascript': `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  'typescript': `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  'python': `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  'java': `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  'csharp':
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  'php': "<?php\n\n$name = 'Alex';\necho $name;\n",
  "cpp": "#include <iostream>\n\nint main() {\n  std::string name = \"Alex\";\n  std::cout << \"Hello, \" << name << \"!\" << std::endl;\n  return 0;\n}",
  "c": "#include <stdio.h>\n\nint main() {\n  char name[] = \"Alex\";\n  printf(\"Hello, %s!\\n\", name);\n  return 0;\n}",
  "css": "/* Simple greeting style */\n.greeting {\n  font-family: sans-serif;\n  font-size: 1.2em;\n  color: blue;\n}",
  "html": "<div class=\"greeting\">\n  <p>Hello, Alex!</p>\n</div>",
  "json": "{\n  \"greeting\": \"Hello, Alex!\"\n}",
  "mysql": "-- Simple greeting query\nSELECT CONCAT('Hello, ', 'Alex', '!');",
  "dart": "void main() {\n  String name = 'Alex';\n  print('Hello, $name!');\n}",
  "solidity": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract Greeter {\n    string public greeting;\n\n    constructor() {\n        greeting = \"Hello, Alex!\";\n    }\n\n    function greet() public view returns (string) {\n        return greeting;\n    }\n}",
  "rust": "fn main() {\n    let name = \"Alex\";\n    println!(\"Hello, {}!\", name);\n}",
  "dockerfile": "# Use a lightweight Alpine Linux base image\nFROM alpine:latest\n\n# Install necessary packages (if any)\nRUN apk update && apk add --no-cache bash\n\n# Set a greeting environment variable\nENV GREETING=\"Hello, Alex!\"\n\n# Command to run when the container starts\nCMD [\"sh\", \"-c\", \"echo \\\"$GREETING\\\"\"]",
  "powershell": "$name = 'Alex'\nWrite-Host \"Hello, $name!\""
};
