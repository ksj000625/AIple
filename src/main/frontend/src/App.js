// src/main/frontend/src/App.js

import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    axios.get('/api/user/all')
        .then(response => {
            setUserEmail(response.data[0].email);
            console.log(userEmail)
        })
        .catch(error => console.log(error))
  }, []);

  return (
      <div>
        백엔드에서 가져온 데이터입니다 : {userEmail}
      </div>
  );
}

export default App;