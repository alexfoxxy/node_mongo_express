/*var mongoose = require('mongoose');

var MediaSchema = new mongoose.Schema({
  updatedAt: String,
  date: { type: Date, default: Date.now },
  filePath: String,  
});

module.exports = mongoose.model('Media', MediaSchema);*/
const { timeStamp } = require('console');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class MediaFiles {
  constructor(date, url, path_file) {
    this.date = date
    this.url = url
    this.id = uuidv4()
    this.path_file = path_file
  }

  toJSON() {
    return {
      date: this.date,
      url: this.url,
      id: this.id,
      path_file: this.path_file
    }
  }

  async save() {
    const media = await MediaFiles.getAll()
    media.push(this.toJSON())

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'temp_files', 'tmpfiles.json'),
        JSON.stringify(media),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })   
    console.log('media', media)
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'temp_files', 'tmpfiles.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
    
  }
}

module.exports = MediaFiles
