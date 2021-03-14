export default (order, w) => {
  const { products, user: { name, phone, email }, delivery: { region, city, office }, orderId, total } = order
  let mailData = `<html><head><title>Заказ №${orderId}</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><style type="text/css">@media print{body{-webkit-print-color-adjust: exact;}}*{margin:0;padding:0}ul{list-style-type:none}h3{font:700 20px/1.5 Helvetica,Verdana,sans-serif}li img{float:left;margin:0 15px 0 0}li p{font:200 14px/1.5 Times New Roman,Georgia,serif!important}a{color:white !important}li{padding:10px;overflow:auto}.footer,.list-header{padding:15px;color:#fff;font-size:18px}li:not(:last-child){border-bottom:1px solid #ddd}li:hover{background:#eee;cursor:pointer}.container{max-width:700px;border:1px solid #db2828;border-radius:10px;border-shadow:0;margin:10px auto}.list-header{text-align:center;font-weight:700;background-color:#db2828;border-top-left-radius:10px;border-top-right-radius:10px}.list-container img{width:100px}.footer{background-color:#3e3e3e;border-bottom-left-radius:10px;border-bottom-right-radius:10px;text-align:right}.footer p{text-align:left;font-size:14px}</style></head><body><div class="container">`

  mailData += `<div class="list-header">Оформлен заказ №${orderId}</div><div class="list-container"><ul>`
  // console.log('products', products)
  products.forEach((product, i) => {
    mailData += `<li><img src="https://shop.magnum.com.ua${product.item.img}"><h4>${i+1}. ${product.item.title} (${product.count})</h4><p>`
    mailData += `Количество (шт): ${product.count}<br>`
    mailData += `Цена за единицу (USD): ${product.item.priceUAH}<br>`
    mailData += `</p>`
  })

  mailData += `</li></ul></div><div class="footer"><p>`
  mailData += `Доставка:<br>`
  mailData += `${region} обл.<br>`
  mailData += `${city}<br>`
  mailData += `${office}<br><br>`
  mailData += `${name}<br>`
  mailData += `${phone}<br>`
  mailData += `${email}`

  mailData += `</p>Итого: ${total} грн</div></div>`
  mailData += `<br><br>`
  mailData += `${region} обл., ${city}<br>`
  mailData += `${office}<br><br>`
  mailData += `${name}<br>`
  mailData += `${phone}<br>`
  mailData += `</body></html>`
  var win = window.open('', `заказ №${orderId}`, `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${w.screen.width * 0.8},height=${w.screen.height * 0.8}`);
  win.document.body.innerHTML = mailData;
  win.print()
}