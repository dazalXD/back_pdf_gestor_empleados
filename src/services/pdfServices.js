// src/services/pdfService.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

//pdfkit
exports.generatePDF = (writableStream, docData) => {
    // const doc = new pdfKit();
    // doc.on('data', data)
    // doc.on('end')
    // doc.fontSize(25).text('Hello World', 100, 100);
    // doc.end();
    const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    // pipea el PDF directo al response de Express
    doc.pipe(writableStream);
    const data = (typeof docData.get === 'function') ? docData.get({ plain: true }) : docData;

    // Contenido del PDF - lo adaptas al diseño que quieras
    doc.fontSize(18).text('Documento de Registro', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`ID: ${data.id ?? 'N/A'}`);
    doc.moveDown(0.5);

    doc.text(`Nombre: ${data.name ?? 'N/A'}`);
    doc.moveDown(0.5);

    doc.text(`Contrato: ${data.contract ?? 'N/A'}`);
    doc.moveDown(0.5);

    doc.text(`Saldo: ${data.balance ?? 'N/A'}`);
    doc.moveDown(0.5);

    // Si date viene como Date o string, intenta formatear
    const dateVal = data.date ? (data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date) : 'N/A';
    doc.text(`Fecha: ${dateVal}`);
    doc.moveDown(0.5);

    doc.text(`Teléfono: ${data.phone ?? 'N/A'}`);
    doc.moveDown(1);

    // Puedes agregar más detalles, tablas, logos, etc.
    // Ejemplo: línea separadora
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();

    // finaliza el documento — esto hace que el stream se cierre (res o PassThrough)
    doc.end();
};



