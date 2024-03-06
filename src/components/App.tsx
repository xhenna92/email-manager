import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";
import { ChakraProvider, SimpleGrid, Box, Container } from '@chakra-ui/react'
import AvailableRecipients from "./AvailableRecipients";
import recipientsData from "../assets/recipientsData.json";

const App = () => {

return <ChakraProvider>
    <div><TimescaleLogo /></div>
    <Container maxW='container.md'>
        <SimpleGrid columns={2} spacing={10}>
            <AvailableRecipients recipients={recipientsData}/>
        </SimpleGrid>
    </Container>
</ChakraProvider>;
}

export default App;
