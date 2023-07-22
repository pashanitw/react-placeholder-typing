import React from 'react'

import ExampleComponent from 'react-typing-effect'

const placeholders = ['https://dubsub.ai', 'https://producthunt.com', 'https://www.indiehackers.com'];
const App = () => {
  return <ExampleComponent placeholders={placeholders} containerStyle={{backgroundColor:'red'}} inputStyle={{color:'red'}}/>
}

export default App
