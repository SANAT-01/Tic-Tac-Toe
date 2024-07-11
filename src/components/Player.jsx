import {useState} from 'react';

export default function Player({initialName, symbol, isActive}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setName] = useState(initialName);
    
    function handleChange(event) {
        setName(event.target.value);
    }
    
    function handleEditClick() {
        console.log("Clicking.....")
        setIsEditing((editing) => !editing);
    }

    let editPlayerName = <span className="player-name">{playerName}</span>

    if (isEditing) {
        editPlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    }
    
    return (
        <li className={isActive ? "active" : undefined}>
            <span className='player'>
              {editPlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}