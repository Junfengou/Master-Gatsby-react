const nodemailer = require("nodemailer");

function generateOrderEmail({ order, total })
{
  return `
    <div>
      <h2>Your recent order for ${total}</h2>
      <p>Please start walking! We will have your order in 20 min! </p>
      <ul>
        ${order.map(item => `<li>
          <img src="${item.thumbnail}"  alt="${item.name}"/>
          <strong>${item.size}</strong> [${item.name}] - ${item.price}
        </li>`).join('')}
      </ul>
      <p>Your total is <strong>$${total}</strong> due at pick up 🍕</p>
      <style>
          ul {
            list-style: none;
          }
      </style>
    </div>
  `;
}

function wait(ms = 0)
{
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  })
}


// Go to Ethereal.email and create an account
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    }
});

exports.handler = async (event, context) => {
    await wait(5000)
    const body = JSON.parse(event.body)

    // check if they have filled out the honeyPot
    if(body.mapleSyrup)
    {
      return {
          statusCode: 400,
          body: JSON.stringify({ message: `Boop Beep Bop zzzzzzstiz! F$%Ck A$%GYFDSHHHHHH`})
      }
    }

    // validate the data coming in is correct
    const requiredFields = ['email', 'name', 'order'];
    for(const field of requiredFields)
    {
        if(!body[field])
        {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: `Opps! You are missing the ${field} field`})
          }
        }
    }

    // make sure they actually have items in the order
    if(!body.order.length)
    {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Why would you order nothing?! What kind of maniac are you?!"})
      }
    }

    // send the email
    
    const info = await transporter.sendMail({
      from: "Slick's Slices <slick@example.com>",
      to: `${body.name} <${body.email}>`,
      subject: 'New order!',
      html: generateOrderEmail({ order: body.order, total: body.total }),
    });
    console.log(info);
    return {
      statusCode: 200,
      body: JSON.stringify({status: 'Success'}),
    };
  };

  // send the success or error message



// Test example to send a simple email
{/* 
exports.handler = async (event, context) => {
    const info = await transporter.sendMail({
      from: "Slick's Slices <slick@example.com>",
      to: 'orders@example.com',
      subject: 'New order!',
      html: `<p>Your new pizza order is here!</p>`,
    });
    console.log(info);
    return {
      statusCode: 200,
      body: JSON.stringify(info),
    };
  };
*/}

  