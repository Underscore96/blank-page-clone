const textArea = document.getElementById('text-input');
const wordCount = document.getElementById('word-count');
const charCount = document.getElementById('char-count');
const downloadButton = document.getElementById('download-button');

textArea.addEventListener('input', () => {
    const text = textArea.value;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const characters = text.length;

    wordCount.textContent = `${words} ${words === 1 ? 'word' : 'words'}`;
    charCount.textContent = `${characters} ${characters === 1 ? 'character' : 'characters'}`;

    // Salva il testo nel localStorage
    localStorage.setItem('userText', text);
});

// Carica il testo salvato nel localStorage (se presente)
const savedText = localStorage.getItem('userText');
if (savedText) {
    textArea.value = savedText;
    textArea.dispatchEvent(new Event('input'));
}

// Gestisci il download del testo come file TXT
downloadButton.addEventListener('click', () => {
    const textToDownload = textArea.value;
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mytext.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
