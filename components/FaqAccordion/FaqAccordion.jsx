import React from 'react';
import './FaqAccordion.css';
import Accordion from 'react-bootstrap/Accordion';

function FaqAccordion() {
  return (
    <div className='faq-section'>
        <div className='container d-flex flex-column align-items-center'>
            <h2 className='text-center text-capitalize mb-5'><b>Frequently asked questions</b></h2>
            <p className='text-center mb-5'>Explore our FAQs to find clarity on the MHT CET admission process.
            Get informed and make confident decisions about your future!</p>
            <Accordion defaultActiveKey="" flush>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>First question ?</Accordion.Header>
                    <Accordion.Body>
                    <b>What is the fee structure for engineering colleges under MHT CET?</b>
                    A: The fee structure varies by college and course. You can find detailed information about the fee structure on the our Website.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header>Second question ?</Accordion.Header>
                    <Accordion.Body>
                    <b>How does the MHT CET or CET cell resolve tie-breaking situations when two candidates have the same percentile in the exam?</b>   
                    A: The tie-breaking mechanism ranks candidates with identical percentiles by comparing their individual subject scores (Physics, Mathematics, and Chemistry). If scores are still tied, the candidate's age is considered
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='2'>
                    <Accordion.Header>Third question ?</Accordion.Header>
                    <Accordion.Body>
                    <b>Can we get spot round information of perspective college?</b>
                    A: Yes, Our Website is Providing and updating that Information.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='3'>
                    <Accordion.Header>Fourth question ?</Accordion.Header>
                    <Accordion.Body>
                    <b>What happens if a candidate fails to secure a seat in the first round of MHT CET counseling?</b>
                    A: If a candidate does not secure a seat in the first round of MHT CET counseling, they are able to participate in the next round of the Centralised Admission Process (CAP)
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    </div>
  )
}

export default FaqAccordion;