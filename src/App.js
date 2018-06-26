import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    formSearch: "",
    formNumber: "5",
    formStyle: "portrait",
    pics: [],
    avatar:[]
  }


  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }



  addImages = () => {
    const options = {
      headers: {
        Authorization: `Client-ID 519ac539d65f2b5cd65076c1b2ce5814193ecee544fdc0bbce9e6db2362de7ba`
    }
  };

    fetch(`https://api.unsplash.com/search/photos?query=
    ${this.state.formSearch}&orientation=${this.state.formStyle}&per_page=${this.state.formNumber}`,options)
    .then(results => results.json())
    .then((data) => {
      console.log(data)
      this.setState({pics:data.results})
    })
  }

  viewImages = () => {
    return (
    <div className="screen">
    {this.state.pics.map(img => {
      return( 
        < img key={img.id} src={img.urls.small} alt="pic"/>
        )
    })}
    </div>
  )
}



  addAvatar = () => {
    const options = {
      headers: {
        Authorization: `Client-ID 519ac539d65f2b5cd65076c1b2ce5814193ecee544fdc0bbce9e6db2362de7ba`
    }
  };

    fetch(`https://api.unsplash.com/photos/random`,options)
    .then(results => results.json())
    .then((data) => {
      console.log(data)
      this.setState({avatar:data.results})
    })
  }

  viewAvatar = () => {
    return (
    <div className="screenTwo">
    {this.state.avatar.map(img => {
      return( 
        < img key={img.id} src={img.urls.thumb} alt="avatar"/>
        )
    })}
    </div>
  )
}




  render() {
    return (
      <div className="App">
        <div >{ this.viewAvatar()} </div>

        <label>
          <input type="text" name="formSearch" value={this.state.formSearch} onChange={this.handleChange} />
        </label>

        <div>
        <button onClick ={this.addImages} type="submit">SEARCH</button>
        </div>

        <div>
        <select name="formNumber" value={this.state.formNumber} onChange={this.handleChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
        </select>
        <select name="formStyle" value={this.state.formStyle} onChange={this.handleChange}>
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
            <option value="squarish">Squarish</option>
            <option value="">All</option>
          </select>
        </div>

        <div >{ this.viewImages()} </div>
        
      </div>
    );
  }
}


export default App;
