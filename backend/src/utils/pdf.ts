import puppeteer from 'puppeteer';

export async function generateInvoicePDF(invoice: any): Promise<Buffer> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Simple HTML template for invoice (replace with pixel-perfect later)
  const html = `
    <html>
      <head>
        <title>Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #eee; }
        </style>
      </head>
      <body>
        <h1>Invoice</h1>
        <p><strong>Name:</strong> ${invoice.user.name}</p>
        <p><strong>Email:</strong> ${invoice.user.email}</p>
        <p><strong>Date:</strong> ${new Date(invoice.createdAt).toLocaleDateString()}</p>
        <table>
          <thead>
            <tr><th>Product</th><th>Qty</th><th>Rate</th><th>Total</th></tr>
          </thead>
          <tbody>
            ${invoice.products.map((p: any) => `<tr><td>${p.name}</td><td>${p.qty}</td><td>${p.rate}</td><td>${p.total}</td></tr>`).join('')}
          </tbody>
        </table>
        <p><strong>Sub-total:</strong> ${invoice.total}</p>
        <p><strong>GST (18%):</strong> ${invoice.gst}</p>
        <p><strong>Grand Total:</strong> ${invoice.grandTotal}</p>
      </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfUint8Array = await page.pdf({ format: 'A4' });
  await browser.close();
  return Buffer.from(pdfUint8Array);
}
