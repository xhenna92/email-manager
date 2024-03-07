import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Checkbox,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import Layout from './Layout';
import { isValidEmail, groupEmailsByCompany } from './data';

const AvailableRecipients = (props: AvailableRecipientsProps) => {
    const { recipients, addRecipient, selectRecipients, deselectRecipients} = props;
    const [filteredEmails, setFilteredEmails] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddBtn, setShowAddBtn] = useState(false);
    const [addPressed, setAddPressed] = useState(false);

    const filterEmailsWithTerm = (s: string) => {
        const emails = groupEmailsByCompany(recipients.filter(function (e) {
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

    useEffect(() => {
        if (addPressed) {
            setShowAddBtn(false);
            setAddPressed(false);
        }
    }, [addPressed]);

    const emailDisplay = (e: { email: string, isSelected: boolean }) => {
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

    return <Layout title="Available Recipients">
            <InputGroup size='md'>
            <Input placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)} />
                <InputRightElement width='4.5rem' visibility={showAddBtn ? 'visible': 'hidden'}>
                <Button h='1.75rem' size='sm' onClick={() => {setAddPressed(true); addRecipient(searchTerm);}}>
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
    </Layout>;
}

declare interface AvailableRecipientsProps {
    recipients: {email: string, isSelected: boolean}[],
    addRecipient: (email: string) => void,
    selectRecipients: (emails: string[]) => void,
    deselectRecipients: (emails: string[]) => void,
}

export default AvailableRecipients;
