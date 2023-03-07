import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

export default function ModalInstructions({ modalInstructionList, expanded, setExpanded, theme }) {
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box>
      {modalInstructionList && modalInstructionList.length > 0 ? (
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h6"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            textDecoration: 'underline',
            mb: 1,
          }}
        >
          Instructions
        </Typography>
      ) : null}

      {modalInstructionList && modalInstructionList.length > 0
        ? modalInstructionList.map(({ instruction, step }) => (
            /* eslint-disable indent */
            <Accordion
              key={step}
              expanded={expanded === `panel${step}`}
              onChange={handleChange(`panel${step}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id={`panel${step}bh-header`}
                sx={{
                  backgroundColor: theme.palette.background.main,
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h6"
                  sx={{ flexShrink: 0 }}
                >
                  Step: {step}{' '}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="span" component="span">
                  {instruction}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        : null}
    </Box>
  );
}
