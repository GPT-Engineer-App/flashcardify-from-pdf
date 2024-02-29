import React, { useState } from "react";
import { Box, Button, Container, VStack, Heading, Input, Textarea, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { FaSave, FaArrowRight, FaArrowLeft } from "react-icons/fa";

// Flashcard component
const Flashcard = ({ question, answer, showAnswer }) => (
  <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
    <Heading fontSize="xl">{question}</Heading>
    {showAnswer && <Text mt={4}>{answer}</Text>}
  </Box>
);

const Index = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const toast = useToast();

  const addFlashcard = () => {
    if (question.trim() === "" || answer.trim() === "") {
      toast({
        title: "Error",
        description: "Question and answer cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setFlashcards([...flashcards, { question, answer }]);
    setQuestion("");
    setAnswer("");
    toast({
      title: "Success",
      description: "Flashcard added.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const goToNextCard = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const goToPreviousCard = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={8} mt={10}>
        <Heading>Create Flashcards from PDF</Heading>
        <Input placeholder="Enter question" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <Textarea placeholder="Enter answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <SimpleGrid columns={2} spacing={4} width="full">
          <Button leftIcon={<FaSave />} colorScheme="blue" onClick={addFlashcard}>
            Save Flashcard
          </Button>
          <Button
            leftIcon={<FaSave />}
            colorScheme="teal"
            onClick={() => {
              const flashcardType = prompt("What kind of flashcard would you like?");
              if (flashcardType) {
                setFlashcards([...flashcards, { question: `AI-generated Question for ${flashcardType}?`, answer: `AI-generated Answer for ${flashcardType}.` }]);
              }
            }}
          >
            AI Generate Flashcard
          </Button>
        </SimpleGrid>
        <SimpleGrid columns={2} spacing={10} width="full">
          <Button leftIcon={<FaArrowLeft />} onClick={goToPreviousCard} isDisabled={flashcards.length === 0}>
            Previous
          </Button>
          <Button rightIcon={<FaArrowRight />} onClick={goToNextCard} isDisabled={flashcards.length === 0}>
            Next
          </Button>
        </SimpleGrid>
        {flashcards.length > 0 && (
          <Box width="full">
            <Flashcard question={flashcards[currentCard].question} answer={flashcards[currentCard].answer} showAnswer={showAnswer} />
            <Button mt={4} onClick={() => setShowAnswer(!showAnswer)}>
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
