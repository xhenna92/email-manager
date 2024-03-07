import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Center,
    Heading,
    Input,
    Stack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';

const AvailableRecipients = (props: AvailableRecipientsProps) => {
    const {recipients} = props;
    const [filteredEmails, setFilteredEmails] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    const groupByCompany = (emails) => {
        const emailsByCompany = {};
        emails.forEach((e) => {
            const key = e.email.split('@')[1];
            if (emailsByCompany[key]) {
                const emailsForKey = emailsByCompany[key];
                emailsForKey.push(e.email);
                emailsByCompany[key] = emailsForKey;
            } else {
                emailsByCompany[key] = [e.email];
            }
        });
        return emailsByCompany;
    }

    const allEmailsGrouped = groupByCompany(recipients);

    const filterEmailsWithTerm = (s) => {
        return groupByCompany(recipients.filter(function (e) {
            return e.email.includes(s);
        }));
    }

    useEffect(() => {
        setFilteredEmails(allEmailsGrouped);
    }, [recipients]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(searchTerm === "") {
                setFilteredEmails(allEmailsGrouped);
            } else {
                setFilteredEmails(filterEmailsWithTerm(searchTerm));
            }
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])



    const emailDisplay = (e) => {
        return <Box key={e} as="span" flex='1' textAlign='left' display='block' padding={'0.5rem 1rem'}>
            {e}
        </Box>; 
    };

    return <Box borderWidth='1px' borderRadius='lg' overflow='hidden' padding="0.5rem">
        <Stack mt='6' spacing='3'>
            <Center><Heading size='md' >Available Recipients</Heading></Center>
            <Input placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)} />
            <Accordion allowMultiple={true}>
                {Object.keys(filteredEmails).map((key) => {
                    const emailsForKey = filteredEmails[key];
                        if (emailsForKey.length === 1) {
                            return emailDisplay(emailsForKey[0]);
                        }
                        return <AccordionItem key={key}>
                            <h2>
                                <AccordionButton>
                                    <Box as="h4" flex='1' textAlign='left' fontWeight='bold'>
                                        {key}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
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
    recipients?: {email: string, isSelected: boolean}[]
}

export default AvailableRecipients;
