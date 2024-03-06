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

const AvailableRecipients = (props: AvailableRecipientsProps) => {

const groupByCompany = () => {
    const emails = {};
    props.recipients.forEach((e) => {
        const key = e.email.split('@')[1];
        if (emails[key]) {
            const emailsForKey = emails[key];
            emailsForKey.push(e.email);
            emails[key] = emailsForKey;
        } else {
            emails[key] = [e.email];
        }
    });
    return emails;
}

const emailsGroupedByCompany = groupByCompany();
const emailDisplay = (e) => {
    return <Box key={e} as="span" flex='1' textAlign='left' display='block' padding={'0.5rem 1rem'}>
        {e}
    </Box>; 
};

return <Box borderWidth='1px' borderRadius='lg' overflow='hidden' padding="0.5rem">
    <Stack mt='6' spacing='3'>
        <Center><Heading size='md' >Available Recipients</Heading></Center>
        <Input placeholder='Basic usage' />
        <Accordion allowMultiple={true}>
                {Object.keys(emailsGroupedByCompany).map((key) => {
                    const emailsForKey = emailsGroupedByCompany[key];
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
