import React, { useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from "./components"
import 'stream-chat-react/dist/css/index.css'
import './App.css'

const cookies = new Cookies(); 

const APIKey = 'udyqs7wpgys5';
const authToken = cookies.get("token");
const client = StreamChat.getInstance(APIKey);

if(authToken){
	client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
		image: cookies.get('avatarURL'),
		hashedPassword: cookies.get('hashedPassword'),
		phoneNumber: cookies.get('phoneNumber'),
	}, authToken)
}



const App = () => {

	const [createType, setCreateType] = useState('')
	const [isCreating, setIsCreating] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	if(!authToken) return <Auth />
	
  return (
	<div className="app__wrapper">
		<Chat client={client} theme="team dark">
			<ChannelListContainer 
				isCreating={isCreating}
				setIsCreating={setIsCreating}
				setIsEditing={setIsEditing}
				setCreateType={setCreateType}


			/>
			<ChannelContainer 
				isCreating={isCreating}
				setIsCreating={setIsCreating}
				setIsEditing={setIsEditing}
				isEditing={isEditing}
				createType={createType}
			/>
		</Chat>
		
	</div>
  )
}

export default App