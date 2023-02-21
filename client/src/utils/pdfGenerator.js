import { jsPDF } from "jspdf";
import "jspdf-autotable";

const generarPDF = (data) => {
    console.log(data);
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Factura", pdf.internal.pageSize.getWidth() / 2, 10, null, null, "center");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    let nombre = data.user.firstName.charAt(0).toUpperCase() + data.user.firstName.slice(1);
    let apellido = data.user.lastName.charAt(0).toUpperCase() + data.user.lastName.slice(1);
    pdf.text(`Nombre y Apellido: ${nombre} ${apellido}`, 10, 20);
    pdf.text(`Usuario: ${data.user.userName}`, 10, 30);
    let fecha = new Date().toLocaleDateString();
    let hora = new Date().toLocaleTimeString();
    pdf.text(`Fecha: ${fecha} - ${hora}`, 10, 40);
    pdf.setFont("helvetica", "bold");
    pdf.text("Detalles de la Compra", pdf.internal.pageSize.getWidth() / 2, 50, null, null, "center");

    // Tabla
    const productos = data.productos;
    const columns = ["Producto", "Precio Unitario", "Cantidad", "Total"];
    const rows = [];
    let total = 0;

    productos.forEach((producto) => {
        const row = [
            producto.name,
            producto.price,
            producto.cantidad,
            producto.price * producto.cantidad
        ];
        total += (producto.price * producto.cantidad);
        rows.push(row);
    });

    // Generar tabla y poner como ultimo elemento el total
    pdf.autoTable(columns, rows, {
        startY: 60,
        theme: "grid",
        styles: {
            fontSize: 8,
            cellPadding: 2,
            overflow: "linebreak",
            columnWidth: "wrap",
        }
    });

    
    


    pdf.text(`Total: $${total}`, 10, pdf.autoTable.previous.finalY + 10);
    pdf.save("factura.pdf");
};

export { generarPDF};