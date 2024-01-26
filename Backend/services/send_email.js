const nodemailer = require('nodemailer')
require('dotenv').config();

const mail_transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASS
    }
})

module.exports.sendMail = async(topic,content,email) => {
    try {
        const logo = `https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/274163263_3242059516076711_1703657668431146348_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEQXYf8yryMOiBHMmrwPVhztwzbZRTykJ63DNtlFPKQngRL_1sLqaexOBQIhKEFTreXlbhFCr1ANB0hBJdtEGky&_nc_ohc=ut7WRmT5WpMAX8QI1jO&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAtbA_0Ayzjml-SfcKM1KW2vbCou3g2oi5ZhOjx_B1Nyg&oe=65B3CD4C`
        // const logo = process.env.LOGO
        const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;700&display=swap">
                <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Thai&display=swap" rel="stylesheet">
                <title>หน้าบทความ</title>
                <style>
                    body {
                        font-family: 'Noto Sans Thai', sans-serif;
                        margin: 20px;
                        padding: 0;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    
                    .topic-header {
                        background-color: #f78ac1;
                        color: #fff;
                        padding-left: 20px;
                        padding-right: 20px;
                        padding-bottom: 0px;
                        padding-top: 0px;
                        text-align: center;
                        display: flex;
                        max-width: 800px;
                        margin: 0 auto;
                        flex-direction: column; 
                        justify-content: center; 
                        align-items: center; 
                        width: 100%;  
                    }

                    .topic-title {
                        text-align:center;
                        width:100%;
                        font-size:25px;
                    }

                    .topic-img {
                        background-color: #f78ac1;
                        color: #fff;
                        padding-left: 20px;
                        padding-right: 20px;
                        padding-bottom: 0px;
                        padding-top: 20px;
                        text-align: center;
                        display: flex;
                        max-width: 800px;
                        margin: 0 auto;
                        flex-direction: column; 
                        justify-content: center; 
                        align-items: center; 
                        width: 100%; 
                        height: auto; 
                    }
                    
                    .topic-img img {
                        display: block;
                        max-width: 100px;
                        max-height: 100px;
                        margin: 0 auto; /* จัดให้รูปอยู่ตรงกลางตามแนวนอน */
                    }
                    
                    h3 {
                        margin: 0;
                        font-size: 20px; /* Adjust the font size as needed */
                    }
                    
                    article {
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        text-align: left;
                        display: flex;
                        flex-direction: column;
                        text-align: left;
                        max-width: 800px;
                        height: auto;
                        font-family: 'Noto Serif Thai', serif;
                    }
                    
                    .footer {
                        background-color: #f78ac1;
                        color: #fff;
                        padding: 15px;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: row;
                        max-width: 800px;
                        margin: 0 auto;
                    }

                    .text-footer{
                        text-align:center;
                        width:100%;
                        font-size:14px;
                    }
                    
                    h1,
                    h3 {
                        color: #fff;
                    }
                    
                    h1 {
                        font-size: 2em;  
                        margin-bottom: 0.5em;  
                    }
                    
                    h2 {
                        font-size: 1.5em;  
                        margin-bottom: 0.5em;  
                    }
                    
                    h3 {
                        font-size: 1.2em;  
                        margin-bottom: 0.5em;  
                    }

                    ul {
                        list-style-type: disc;
                        margin-left: 2rem;
                    }

                    ol {
                        list-style-type: decimal;
                        margin-left: 2rem;
                    }

                    li {
                        margin-bottom: 0.5em;
                    }

                    a {
                        color:#326CEC;
                        text-decoration: underline;
                    }

                    .ql-indent-1 {
                        margin-left: 1.5em; 
                    }

                    .ql-indent-2 {
                        margin-left: 3em; 
                    }

                    .ql-indent-3 {
                        margin-left: 4.5em; 
                    }

                    .ql-indent-4 {
                        margin-left: 6em; 
                    }

                    .ql-indent-5 {
                        margin-left: 7.5em; 
                    }

                    .ql-indent-6 {
                        margin-left: 9em; 
                    }

                    .ql-indent-7 {
                        margin-left: 10.5em; 
                    }

                    .ql-indent-8 {
                        margin-left: 12em; 
                    }

                    .ql-align-right {
                        text-align: right;
                    }

                    .ql-align-center {
                        text-align: center;
                    }

                    .ql-align-left {
                        text-align: left;
                    }

                    .ql-align-justify {
                        text-align: justify;
                    }
                </style>
            </head>

            <body>
                <div class="topic-img">
                    <img src="${logo}">
                </div>
                <div class="topic-header">
                    <p class="topic-title" >โรงเรียนเทศบาลน้ำพองภูริพัฒน์</p>
                </div>

                <article>
                    <div class="ql-container">
                        <div class="ql-editor">
                            ${content}
                        </div>
                    </div>
                </article>

                <div class="footer">
                    <p class="text-footer"> &copy; 2023 โรงเรียนเทศบาลน้ำพองภูริพัฒน์ </p>
                </div>
            </body>

        </html>
        `
        await mail_transport.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: topic,
            text: topic,
            html: html
        })

    } catch (err) {
        console.log(err);
        console.error(err);
    }
}