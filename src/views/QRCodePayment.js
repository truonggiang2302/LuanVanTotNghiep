const QR =
  " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKlSURBVO3BQW7sWAwEwSxC979yjnfD1QMEqfvbBCPiD9YYxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGuXgoCd+k0iXhDpU7kvBNKk8Ua5RijVKsUS5epvKmJNyhcpKETuUOlTcl4U3FGqVYoxRrlIsPS8IdKk8k4USlS0KnckcS7lD5pGKNUqxRijXKxR+ncpKELgmTFWuUYo1SrFEu/rgkrP8Va5RijVKsUS4+TOWTVLokdCqfpPKbFGuUYo1SrFEuXpaEb0pCp9IloVPpktCpnCThNyvWKMUapVijxB8MloROZbJijVKsUYo1ysVDSehUTpLwTSpdEjqVLgmdykkSOpUuCXeoPFGsUYo1SrFGuXhIpUtCp3KHyhNJuCMJnUqXhE6lU7lD5ZOKNUqxRinWKBcPJeEkCU8koVM5UemScEcSnkjCHUnoVJ4o1ijFGqVYo8QfvCgJncpJEk5UuiScqNyRhBOVLgknKl0STlTeVKxRijVKsUa5+LAkdCqdSpeELgmdyh1J+CSVLgmdSpeETyrWKMUapVijxB/8YUk4UTlJQqdyRxI6lS4Jd6g8UaxRijVKsUa5eCgJ36TyRBI6lS4JJyonSThR+aRijVKsUYo1ysXLVN6UhDtUTlSeSEKn0iXhJAmdypuKNUqxRinWKBcfloQ7VJ5IwonKicqbVL6pWKMUa5RijXIxjEqXhC4Jd6icJKFT+ZeKNUqxRinWKBd/nEqXhCdU3pSEO1SeKNYoxRqlWKNcfJjKN6mcJOEkCScqncpvUqxRijVKsUa5eFkSvikJd6h0SbgjCScqnco3FWuUYo1SrFHiD9YYxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFG+Q85uvvrUJR+gAAAAABJRU5ErkJggg==";

const QRtemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
  <meta name="HandheldFriendly" content="true" />
  <meta name="apple-touch-fullscreen" content="YES" />
  <title>GH GYM</title>
  <link href="" rel="stylesheet" />
  <style type="text/css">
    *,
    ::after,
    ::before {
      box-sizing: border-box;
    }

    body {
      padding: 0px;
      margin: 0px;
      background-color: #ffffff;
    }

    body,
    table {
      font-family: "Roboto", sans-serif !important;
      font-size: 14px;
      color: #333333;
      line-height: 1.42857143;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    td {
      padding: 0;
      font-family: "Roboto", sans-serif !important;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    h2 {
      font-weight: normal;
      margin-top: 0px;
      margin-bottom: 17px;
    }

    .title-form {
      font-size: 24px;
      color: #003d75;
      text-transform: uppercase;
      font-weight: bold;
    }

    .name {
      color: #5a5a5a;
      font-size: 27.34px;
      font-weight: 500;
    }

    .text {
      font-size: 18px;
      font-weight: 300;
      color: #5a5a5a;
    }

    .text-blue {
      color: #003d75;
      font-size: 14px;
    }

    .italic {
      font-style: italic;
    }

    .link {
      color: #0000ff;
      cursor: pointer;
    }

    .line {
      width: 30%;
      height: 1px;
      background-color: #dddddd;
      display: inline-block;
    }

    .email {
      border: 1px solid #333333;
      border-radius: 5px;
      -webkit-border-radius: 5px;
      max-width: 450px;
      padding: 10px 15px;
      color: #333333;
      font-weight: 300;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .signing {
      font-size: 20px;
      border: 1px solid #003d75;
      background: #003d75;
      padding: 12px 25px 12px;
      border-radius: 5px;
      -webkit-border-radius: 5px;
      color: #ffffff;
      display: inline-block;
      line-height: 1.1;
      text-align: center;
      text-decoration: none;
      margin-bottom: 8px;
      font-weight: bold;
      cursor: pointer;
      margin-left: auto;
      margin-right: auto;
    }

    .signing:hover {
      background: #003d75;
    }

    .pin-code {
      font-size: 17.5px;
      color: #5a5a5a;
      font-style: italic;
      font-weight: 400;
      text-align: center;
      margin-bottom: 5px;
    }

    .code {
      font-size: 34.18px;
      font-weight: 700;
      letter-spacing: 0.6em;
      text-align: center;
      text-indent: 0.9em;
      color: #5a5a5a;
    }

    .text-desc {
      font-size: 17.5px;
      line-height: 21px;
    }

    .text-explain-question {
      font-size: 11.2px;
      font-weight: 500;
    }

    .text-explain {
      font-size: 11.2px;
      line-height: 14px;
    }
  </style>
</head>

<body>
  <table
    cellspacing="0"
    cellpadding="0"
    width="100%"
    style="
      width: 100%;
      max-width: 450px;
      margin: auto auto;
      border-collapse: unset;
    "
  >
    <tbody>
      <tr>
        <td style="height: 30px"></td>
      </tr>
      <tr>
        <td>
          <table
            style="
              border: 1px solid #dddddd;
              border-radius: 5px;
              border-collapse: unset;
            "
          >
            <tr>
              <td style="padding: 20px">
                <table>
                  <tr>
                    <td style="padding-bottom: 10px; text-align: center">
                      <!-- <img
                        style="max-width: auto"
                        src="https://develop-bizbookly.s3.ap-southeast-1.amazonaws.com/images/2022/7/5/Vector.png"
                        alt="BIZBOOKLY"
                      /> -->
                      <span
                        style="
                          text-align: center;
                          margin: 0 auto;

                          font-weight: 700;
                          color: #fff;
                          background: #5a5a5a;
                          padding: 9px;
                          border: 1px solid transparent;
                          border-radius: 2px;
                          font-size: 18px;
                        "
                        >GH GHYM</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 10px"></td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 5px; text-align: center">
                      <div class="name">Member Code</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 15px">
                      <div class="text text-desc" style="margin-bottom: 10px">
                        <p
                          style="
                            color: #5a5a5a;
                            text-align: center;
                            font-size: 16px;
                          "
                        >
                          Thanks you for booking at GH GYM and welcome to GH
                          GYM to get better every day
                        </p>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-top: 0px; padding-bottom: 33px">
                      <div class="pin-code">Member Code</div>
                      <div class="code">
                      <img
                      src='cid:qr'
                    />
                      </div>
                    </td>
                  </tr>
                  <tr style="border-top: 0.5px solid #dcdedf">
                    <td>
                      <div style="padding-top: 5px">
                        <p
                          style="
                            color: #5a5a5a;
                            font-weight: 500;
                            font-size: 13px;
                          "
                        >
                          Need support ?
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div
                        style="
                          padding-top: 10px;
                          padding-bottom: 9px;
                          font-weight: 300;
                          font-size: 12px;
                        "
                      >
                        Feel free to email us if you have any questions,
                        comments or suggestions. We’ll be happy to resolve
                        your issues.
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        /*  */
                        font-size: 12px;
                        font-weight: 300;
                        color: #989898;
                      "
                    >
                      Question? Email us at
                      <a
                        style="font-style: normal; text-decoration: none"
                        href="mailto:duongtruonggiang1215@gmail.com"
                        >support@ghgym.com</a
                      >
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="height: 30px"></td>
      </tr>
    </tbody>
  </table>
</body>
</html>`;
module.exports = {
  QRtemplate,
};
