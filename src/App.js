import './App.css';
import React from 'react'
import { PDFDocument, rgb } from 'pdf-lib'
import sample from './sample.pdf'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      firstPage: null,
      pdf: null,
    }

    this.drawRectangle = this.drawRectangle.bind(this)
  }

  componentDidMount = async () => {
    let currentComponent = this;
    var pdf
    await fetch(sample).then(
      function(res){
        return res.arrayBuffer()
      }).then(function(data) {
        console.log("got data??")
        pdf = data
        currentComponent.setState({pdf})
        console.log(data)
      }).catch(
        function(err) {
          console.log(err)
        }
      )

      console.log("getting pdf doc")
      const pdfDoc = await PDFDocument.load(pdf)
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]
      const { width, height } = firstPage.getSize()
      console.log("width ")
      console.log(width)
      currentComponent.setState({width})
      currentComponent.setState({firstPage})
      
      const pdfDataUri = await pdfDoc.saveAsBase64({dataUri: true})
      document.getElementById('pdf').src = pdfDataUri

    }

    handleDraw() {
      
    }

  async drawRectangle() {
    console.log("draw rectangle")
    var pdf = this.state.pdf
    const pdfDoc = await PDFDocument.load(pdf)
    var pages = pdfDoc.getPages()
    var firstPage = pages[0]
    firstPage.drawRectangle({
      x: 40,
      y: 450,
      width: 100,
      height: 100,
      borderColor: rgb(1,0,0),
      borderWidth: 2,
    })

    const pdfDataUri = await pdfDoc.saveAsBase64({dataUri: true})
    document.getElementById('pdf').src = pdfDataUri
  }

  render() {
    return (
      <div>
        <button onClick={this.drawRectangle}>CLICK ME</button>
        <iframe id="pdf" style={{width: '850px', height: '1100px'}}></iframe>
      </div>
    )
  }

    


}

export default App