import { useState } from "react";
import { ChakraProvider, SimpleGrid, Container } from "@chakra-ui/react";
import AvailableRecipients from "./Recipients/AvailableRecipients";
import SelectedRecipients from "./Recipients/SelectedRecipients";
import recipientsData from "../assets/recipientsData.json";
import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";

const App = () => {
  const [recipients, setRecipients] = useState(recipientsData); // shared recipient object between components

  /**
   * Adds an email object to the recipients array
   * @param {string} email
   */
  const handleAddRecipient = (email: string) => {
    setRecipients([...recipients, { email, isSelected: false }]);
  };

  /**
   * Updates the isSelected property on objects inside of the recipients array
   * @param {string[]} emails
   * @param {boolean} isSelected:boolean
   */
  const handleUpdateRecipients = (emails: string[], isSelected: boolean) => {
    const newRecipients = [...recipients];
    emails.forEach((email) => {
      const recipient = newRecipients.find((r) => r.email === email);
      recipient.isSelected = isSelected;
    });

    setRecipients(newRecipients);
  };

  return (
    <ChakraProvider>
      <div>
        <TimescaleLogo />
      </div>
      <Container maxW="container.md">
        <SimpleGrid columns={2} spacing={10}>
          <AvailableRecipients
            recipients={recipients}
            addRecipient={handleAddRecipient}
            selectRecipients={(e) => handleUpdateRecipients(e, true)}
            deselectRecipients={(e) => handleUpdateRecipients(e, false)}
          />
          <SelectedRecipients
            recipients={recipients}
            deselectRecipients={(e) => handleUpdateRecipients(e, false)}
          />
        </SimpleGrid>
      </Container>
    </ChakraProvider>
  );
};

export default App;
