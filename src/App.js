import './App.css';
import React from 'react'
import { PDFDocument, rgb } from 'pdf-lib'
import sample from './sample.pdf'
import IFrame from 'react-iframe'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

      const pdfDoc = await PDFDocument.load(pdf)
      const pdfDataUri = await pdfDoc.saveAsBase64({dataUri: true})
      document.getElementById('pdf').src = pdfDataUri
    }


  async drawRectangle() {
    console.log("draw rectangle")
    var pdf = this.state.pdf
    const pdfDoc = await PDFDocument.load(pdf)
    var pages = pdfDoc.getPages()
    var firstPage = pages[0]
    firstPage.drawRectangle({
      x: 210,
      y: 450,
      width: 110,
      height: 110,
      borderColor: rgb(1,0,0),
      borderWidth: 2,
    })

    const pdfDataUri = await pdfDoc.saveAsBase64({dataUri: true})
    document.getElementById('pdf').src = pdfDataUri
  }

  render() {
    return (
      <div >
        <button onClick={this.drawRectangle}>CLICK ME</button>
        <IFrame id="pdf" width="100%" height="1500px"></IFrame>
      </div>
    )
  }

    


}

export default App