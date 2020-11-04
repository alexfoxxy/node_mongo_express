const http = require('http');
const fs = require('fs')
const path = require('path');
const { connect } = require('http2');

/**
 * req - отвчечает за запрос
 * res - отвчечает за ответ
 */
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })

        if (req.url === '/') {
            fs.readFile(path.join(__dirname, 'views', 'index.html'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        throw err
                    }

                    res.end(content)
                }
            )
        } else if (req.url === '/api/media') {
            res.writeHead(200, {
                'Content-Type': 'text/json'
            })
            const media = [
                {
                    updatedAt: { type: Date, default: Date.now },
                    date: { type: Date, default: Date.now },
                    filePath: "C:/Users/isakov/Desktop/node_project/temp_files/",   
                }
            ]
            res.end(JSON.stringify(media))
        }

        /*else if (req.url === '/login') {
            fs.readFile(path.join(__dirname, 'views', 'login.html'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        throw err
                    }
                    res.end(content)
                }
            )
        } */

    } else if (req.method === 'POST') {
        const body = []

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        req.on('data', data => {
            body.push(Buffer.from(data))
        })
        req.on('end', () => {
            //console.log(body.toString())

            const message = body.toString().split('=')[1]

            res.end(`
        <h1>Ваше сообщение: ${message}</h1>
     `)
        })

    }
})

server.listen(3000, () => {
    console.log('Server run..')
})