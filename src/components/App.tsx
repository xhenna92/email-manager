import { useState, useEffect } from 'react';
import { ChakraProvider, SimpleGrid, Box, Container } from '@chakra-ui/react'
import AvailableRecipients from "./AvailableRecipients";
import SelectedRecipients from "./SelectedRecipients";
import recipientsData from "../assets/recipientsData.json";
import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";

const App = () => {
    const [recipients, setRecipients] = useState(recipientsData);
    const handleAddRecipient = (email: string) => {
        setRecipients([...recipients, { email, isSelected: false }]);
    }

    const handleUpdateRecipients = (emails: string[], isSelected: boolean) => {
        console.log(emails);
        const newRecipients = [...recipients];
        emails.forEach((email) => {
            const recipient = newRecipients.find(r => r.email === email);
            recipient.isSelected = isSelected;
        });

        setRecipients(newRecipients);
        
    }

return <ChakraProvider>
    <div><TimescaleLogo /></div>
    <Container maxW='container.md'>
        <SimpleGrid columns={2} spacing={10}>
            <AvailableRecipients 
                recipients={recipients} 
                addRecipient={handleAddRecipient} 
                selectRecipients={(e) => handleUpdateRecipients(e, true)} 
                deselectRecipients={(e) => handleUpdateRecipients(e, false)} />
            <SelectedRecipients recipients={recipients} deselectRecipients={(e) => handleUpdateRecipients(e, false)} />
        </SimpleGrid>
    </Container>
</ChakraProvider>;
}

export default App;
