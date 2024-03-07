import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Center,
    Checkbox,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';

const AvailableRecipients = (props: AvailableRecipientsProps) => {
    const { recipients, addRecipient, selectRecipients, deselectRecipients} = props;
    const [filteredEmails, setFilteredEmails] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddBtn, setShowAddBtn] = useState(false);

    const groupByCompany = (emails) => {
        const emailsByCompany = {};
        emails.forEach((e) => {
            const key = e.email.split('@')[1];
            if (emailsByCompany[key]) {
                const emailsForKey = emailsByCompany[key];
                emailsForKey.push(e);
                emailsByCompany[key] = emailsForKey;
            } else {
                emailsByCompany[key] = [e];
            }
        });
        return emailsByCompany;
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const filterEmailsWithTerm = (s) => {
        const emails = groupByCompany(recipients.filter(function (e) {
            return e.email.includes(s);
        }));

        if (Object.keys(emails).length === 0) {
            setShowAddBtn(isValidEmail(s));
        }
        return emails;
    }

    useEffect(() => {
        setFilteredEmails(filterEmailsWithTerm(searchTerm));
    }, [recipients]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilteredEmails(filterEmailsWithTerm(searchTerm));
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm]);

    const emailDisplay = (e) => {
        return <Checkbox
        key={`${e.email}-available`}
        size="md"
        width="100%"
        isChecked={e.isSelected}
        onChange={(ev) => { ev.target.checked ? selectRecipients([e.email]) : deselectRecipients([e.email])}}> 
            <Box  as="span" flex='1' textAlign='left' display='block' padding={'0.5rem 1rem'}>
                {e.email}
            </Box> 
        </Checkbox>; 
    };

    return <Box borderWidth='1px' borderRadius='lg' overflow='hidden' padding="0.5rem">
        <Stack mt='6' spacing='3'>
            <Center><Heading size='md' >Available Recipients</Heading></Center>
            <InputGroup size='md'>
                <Input placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)} />
                <InputRightElement width='4.5rem' visibility={showAddBtn ? 'visible': 'hidden'}>
                    <Button h='1.75rem' size='sm' onClick={()=>addRecipient(searchTerm)}>
                        Add
                    </Button>
                </InputRightElement>
            </InputGroup>
            
            <Accordion allowMultiple={true}>
                {Object.keys(filteredEmails).map((key) => {
                    const emailsForKey = filteredEmails[key];
                        if (emailsForKey.length === 1) {
                            return emailDisplay(emailsForKey[0]);
                        }
                        return <AccordionItem key={key}>
                            <Checkbox
                                key={`${key}-available`}
                                size="md"
                                width="100%"
                                isChecked={emailsForKey.every(em => em.isSelected === true)}
                                onChange={(ev) => { ev.target.checked ? selectRecipients(emailsForKey.map(e => e.email)) : deselectRecipients(emailsForKey.map(e => e.email)) }}> 
                                <h2>
                                <AccordionButton>
                                    <Box as="h4" flex='1' textAlign='left' fontWeight='bold'>
                                        {key}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            </Checkbox>
                            <AccordionPanel pb={4}>
                                {emailsForKey.map((e) => {
                                    return emailDisplay(e);
                                })}
                            </AccordionPanel>
                        </AccordionItem>
                    })}
            </Accordion>
        </Stack>
    </Box>;
}

declare interface AvailableRecipientsProps {
    recipients: {email: string, isSelected: boolean}[],
    addRecipient: (email: string) => void,
    selectRecipients: (emails: string[]) => void,
    deselectRecipients: (emails: string[]) => void,
}

export default AvailableRecipients;
