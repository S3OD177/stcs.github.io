<script src="https://cdn.jsdelivr.net/npm/openai"></script>

<script>
    function analyzeExcel() {
        const apiToken = document.getElementById('apiToken').value;
        const excelFile = document.getElementById('excelFile').files[0];
        const outputDiv = document.getElementById('output');

        if (!apiToken) {
            outputDiv.innerHTML = 'Please enter your OpenAI API Token.';
            return;
        }

        if (!excelFile) {
            outputDiv.innerHTML = 'Please select an Excel file.';
            return;
        }

        outputDiv.innerHTML = 'Analyzing the Excel file. Please wait...';

        const reader = new FileReader();
        reader.onload = async function () {
            const fileContent = reader.result;
            const fileText = new TextDecoder().decode(fileContent);

            // Initialize the OpenAI API client
            const openai = new OpenAI({ key: apiToken });

            // Use GPT-4 to analyze the Excel file
            try {
                const response = await openai.create({
                    model: 'gpt-4-1106-preview', // Replace with the actual GPT-4 engine identifier
                    prompt: `Analyze the following Excel data: \n${fileText}`,
                    temperature: 1,
                    max_tokens: 256,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stream: true
                });

                // Display the analysis results
                outputDiv.innerHTML = `<pre>${response.data.choices[0].text}</pre>`;
            } catch (error) {
                outputDiv.innerHTML = 'Error analyzing the Excel file. Please try again.';
            }
        };
        reader.readAsArrayBuffer(excelFile);
    }
</script>
