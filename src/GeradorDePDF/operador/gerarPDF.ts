import fs from 'fs';
import PDFDocument from 'pdfkit';
import { pdfConfig } from './config';

function generatePDF(config: { title: string; author: string; content: string }) {
    const doc = new PDFDocument();

    // Pipe the PDF into a writable stream
    const stream = fs.createWriteStream(`${config.title}.pdf`);

    // Add metadata
    doc.info['Title'] = config.title;
    doc.info['Author'] = config.author;

    // Add content
    doc.fontSize(20).text(config.content);

    // Finalize the PDF
    doc.end();

    // Log completion
    console.log(`PDF "${config.title}" generated successfully!`);
}

// Function to extract data from HTML and generate PDF
function generatePdfFromHtml() {
    const titleElement = document.getElementById('title');
    const authorElement = document.getElementById('author');
    const contentElement = document.getElementById('content');

    if (titleElement && authorElement && contentElement) {
        const title = titleElement.textContent || '';
        const author = authorElement.textContent || '';
        const content = contentElement.textContent || '';

        generatePDF({ title, author, content });
    } else {
        console.error('Missing elements in HTML.');
    }
}

// Call the PDF generation function on button click
const generatePdfBtn = document.getElementById('generatePdfBtn');
if (generatePdfBtn) {
    generatePdfBtn.addEventListener('click', () => {
        generatePdfFromHtml();
    });
}
