import './App.css';
import React from 'react'
import { PDFDocument } from 'pdf-lib'
import sample from './sample.pdf'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: "",
      width: 0,
    }
  }

  componentDidMount = async () => {
    let currentComponent = this;
    await fetch(sample).then(
      function(res){
        return res.arrayBuffer()
      }).then(function(data) {
        console.log("got data??")
        currentComponent.setState(data)


     


        console.log(data)
      }).catch(
        function(err) {
          console.log(err)
        }
      )

      
      

    }



    // console.log("getting pdf doc")
    // const pdfDoc = await PDFDocument.load(this.state.data)
    // const pages = pdfDoc.getPages()
    // const firstPage = pages[0]
    // const { width, height } = firstPage.getSize()
    // console.log("width ")
    // console.log(width)
    // currentComponent.setState(width)
    

  render() {
    return (
      <div>
        {console.log("data: ", this.state.data)}
      </div>
    )
  }

    


}

export default App