import React from 'react'
import Button from '../design-system/Button';
import Input from '../design-system/Input';

interface SetDisplayNameProps {
    handleSetDisplayName: (name: string) => void;
}

const SetDisplayName: React.FC<SetDisplayNameProps> = (props) => {
    const [name, setName] = React.useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await props.handleSetDisplayName(name)
    }
    return (
        <form onSubmit={handleSubmit}>
            <header>
                <h4>Set your display name to join the chat:</h4>
            </header>
            <Input placeholder='Yannick Jobs' value={name} onChange={(e) => { setName(e.target.value) }} />
            <br />
            <Button css={{ float: 'right' }} type="submit" size="S">Join chat</Button>
        </form>
    )
}

export default SetDisplayName