# CodeSummerCamp-Playground

Welcome to the CodeSummerCamp-Playground repository! This repository serves as a playground for various challenges and exercises used as a teaching tool for kids and teenagers to learn coding during Code Summer Camp.
It was developed as proof-of-concept for our graduation thesis project in software development.

## Table of Contents
- [Project Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Setup & Installation](#setup-and-installation)
- [Adding New Assignments](#adding-new-assignments)
- [Security Considerations](#security-considerations-docker)
- [Future Development](#future-development)
- [License](#license)

## Overview

This project provides a web-based environment for users to practice programming exercises. It leverages Docker containers to execute code in isolated environments, ensuring security and preventing malicious code from affecting the host system.  The primary goal is to offer an engaging and safe platform for learning and testing code, particularly for environments like the Code Summer Camp (CSC).

**Note:** This is a working prototype and requires further development for practical, real-world usage.

## Key Features

*   **Web Interface:** A user-friendly website built with HTML, CSS, and Node.js, allowing users to input code and receive real-time feedback.
*   **Docker Containerization:** Code execution occurs within isolated Docker containers, providing a secure environment.  Currently supports Python.
*   **Automated Testing:**  The system automatically tests user-submitted code against predefined test cases and provides feedback on the results.
*   **Extensible Design:** The architecture is designed to allow for the addition of new programming languages and exercises.
*   **Exercise Management:**  A clear structure for defining and adding new assignments via JSON files.

## Architecture

The project consists of the following main components:

*   **Frontend (Web Interface):**
    *   Built using HTML, CSS, and Node.js.
    *   Provides a user interface for entering code, selecting assignments, and viewing results.
*   **Backend (Code Execution and Testing):**
    *   Utilizes Docker containers to execute code in a sandboxed environment.
    *   Implements testing frameworks to validate code output against expected results.
*   **Assignment Definitions:**
    *   Assignments are defined in JSON files, specifying the exercise title, description, existing code, support code, and test cases.

## Setup and Installation

To set up and run the project, follow these steps:

1.  **Prerequisites:**
    *   Docker: Ensure Docker is installed and running on your system.
2.  **Clone the Repository:**
    ```
    git clone [repository URL]
    cd [repository directory]
    ```
3.  **Build the Docker Images:**
    ```
    docker-compose build
    ```
4.  **Run the Application:**
    ```
    docker-compose up
    ```
5.  **Access the Web Interface:**
    *   Open your web browser and navigate to `http://localhost:[port]` (replace `[port]` with the port the application is running on, typically 3000 or 8000).

## Adding New Assignments

New assignments can be added by following these steps:

1.  **Create a JSON File:**
    *   Create a new JSON file (e.g., `assignment3.json`) or modify an existing one.
2.  **Format the Assignment:**
    *   Use the following JSON structure for each assignment:

    ```
    {
      "assignmentID": {
        "title": "Assignment Title",
        "description": "Detailed description of assignment, incl constraints and examples. Use \\n for line breaks.",
        "existingCode": ["Line of code", "Line of code", ...],
        "supportCode": ["Necessary imported libraries", "Hidden code", "---CODE---", "Additional hidden code"],
        "testCode": {
          "test1": ["Line of test code", "Line of test code", ...],
          "test2": ["Line of test code", ...]
        }
      }
    }
    ```

    *   **`assignmentID`:**  A unique integer identifier (e.g., `"1"`, `"2"`, `"3"`, ...).
    *   **`title`:** A brief, clear, and descriptive title for the assignment.
    *   **`description`:**
        *   A detailed explanation of the task.
        *   Examples and constraints.
        *   Use `\n` for line breaks within the description.
    *   **`existingCode`:**
        *   Code that students will see when they load the assignment.
        *   Do not duplicate code from `supportCode`.
    *   **`supportCode`:**
        *   Code necessary for running the tests that students should not see.
        *   Must include the line `---CODE---` to indicate where student code will be inserted.
        *   Includes necessary imports or setup code.
    *   **`testCode`:**
        *   At least one test case is required.
        *   Each test case should have a unique name (e.g., `"test1"`, `"test2"`).
        *   Each test should include assertions to validate the output.
3.  **Example Assignment (Palindrome Check):**

    ```
    {
      "2": {
        "title": "Assignment 2: Palindrome Check",
        "description": "Implement a function that checks if a given string is a palindrome.\n\nA palindrome is a word, phrase, number, or other sequence of characters which reads the same backward as forward.\n\nExample 1:\nInput: \"racecar\"\nOutput: True\n\nExample 2:\nInput: \"hello\"\nOutput: False\n\nConstraints:\n- Input string length will be at most 100.",
        "existingCode": [
          "def is_palindrome(s):",
          "    "
        ],
        "supportCode": [
          "import sys",
          "---CODE---",
          "def helper_function():",
          " pass"
        ],
        "testCode": {
          "test1": [
            "result = is_palindrome('racecar')",
            "assert result == True, f'Expected True but got {result}'"
          ],
          "test2": [
            "result = is_palindrome('hello')",
            "assert result == False, f'Expected False but got {result}'"
          ]
        }
      }
    }
    ```
4.  **Integrate into the Web Interface:**
    *   Edit the appropriate `playground_{...}.html` file for the relevant language.
    *   Add the `assignmentID` as an option in the `assignmentSelect` element, using the format `{Assignment Title}`.  For example:

    ```
    
      Assignment 1: Some Task
      Assignment 2: Palindrome Check
    
    ```

### Important Notes

*   **No Code Duplication:** Avoid repeating code between `existingCode` and `supportCode`.
*   **JSON Formatting:** Ensure the JSON is properly formatted and valid.  Pay attention to line breaks (`\n`) in descriptions and the proper use of arrays.
*   **Clarity:** Keep titles and descriptions concise and informative.
*   **Security:**  The use of Docker containers significantly enhances security by isolating code execution.

## Security Considerations (Docker)

*   **Process Isolation:**  Containers only have access to their own processes.
*   **Filesystem Isolation:**  Each container has its own filesystem, preventing access to the host filesystem (except for explicitly shared volumes).
*   **Device Isolation:** Containers do not have access to device nodes by default (unless running in privileged mode).
*   **IPC Isolation:**  Containers have their own IPC namespace, preventing inter-process communication with the host or other containers.
*   **Network Isolation:**  Containers have their own network structure.  However, default network settings may leave the system vulnerable to certain attacks. Consider implementing network filtering or using virtual networks.
*   **Resource Limiting:**  Docker uses Cgroups to limit the resources (CPU, memory) that a container can consume, preventing resource exhaustion on the host.
*   **Avoid Privileged Containers:** Do not run containers in privileged mode unless absolutely necessary, as this grants full access to the host system.

## Future Development

*   **Admin Interface:** Develop an administrative interface for adding and managing assignments and languages.
*   **Database Integration:** Implement a database to store user submissions and progress.
*   **User Authentication:**  Add user authentication and authorization.
*   **Expanded Language Support:**  Support for additional programming languages.
*   **Enhanced Security:** Further refine Docker configurations for maximum security.

## License

This repository is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
