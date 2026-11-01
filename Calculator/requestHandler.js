const add = require('./addition')

const requestHandler = (req, res) => {
  console.log(req.url)

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html')

    res.end(`
      <html>
        <body>
          <h1>Hello Abhishek</h1>
          <a href="/calculator">Go to Calculator</a>
        </body>
      </html>
    `)
  }

  else if (req.url === '/calculator') {
    res.setHeader('Content-Type', 'text/html')

    res.end(`
      <html>
        <body>
          <h1>Calculator</h1>

          <form action="/calculate-result" method="POST">
            <input type="number" name="num1"
              placeholder="Enter 1st number" required>

            <input type="number" name="num2"
              placeholder="Enter 2nd number" required>

            <button type="submit">Sum</button>
          </form>

          <a href="/">Go Back Home</a>
        </body>
      </html>
    `)
  }

  else if (
    req.url === '/calculate-result' &&
    req.method === 'POST'
  ) {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      const params = new URLSearchParams(body)

      const num1 = Number(params.get('num1'))
      const num2 = Number(params.get('num2'))

      // Calling addition function from addition.js
      const sum = add(num1, num2)

      res.setHeader('Content-Type', 'text/html')

      res.end(`
        <html>
          <body>
            <h1>Sum = ${sum}</h1>
            <a href="/calculator">Go Back to Calculator</a>
          </body>
        </html>
      `)
    })
  }

  else {
    res.statusCode = 404
    res.end('Page Not Found')
  }
}

module.exports = requestHandler
