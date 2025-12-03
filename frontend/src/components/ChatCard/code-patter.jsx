/* The idea is when this helper is run, the generateAI API endpoint
    is run. So, I'll need an api.js file which will call the backend
    for this and supabase. No need for Lead ID since supabase will not 
    be getting any user or lead information from DB. Instead, all message
    history will be stored in frontend and sent to ai for context. Need to make a 
    professional loading state for response, but I'll use a fast model like Haiku 
    for speedy responses, especially for information gathering questions.


    PLAN: 
     -  ChatCard recieves the 'onClick' function as a prop (allows for 
        card in LandingTitle to show modal and the card in ChatInterface
        to run ai API call)
     -  Create the logic for preparing and sending ai API call inside of 
        ChatInterface...or create as a re-usable hook 
     -  Get the message sending / recieving logic sorted and then create 
        user sign up. Once logic is down, refine prompting for consistent 
        results before deployment.

    Important:
     -  Still need to make nav
     -  Right now, considering just allowing users to use AI as many times 
        as they want...but would be easy enough to limit if taken advantage of
     -  Need end of chat to end in booking consultation. Maybe give ai ability to 
        bring up new modal. Need to figure this out

     */

const handleSendMessage = async (e) => {
    e.preventDefault();
    if (chatInput.trim() === '' || isLoading) return;
    
    console.log('=== Chat Message Starting ===');
    console.log('Chat input:', chatInput);
    console.log('Using sessionId:', sessionId); 
    
    const newMessage = { sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, newMessage]);
    const currentInput = chatInput;
    setChatInput('');
    setIsLoading(true);
    
    try {
      
      const requestBody = {
        type: 'email',
        context: currentInput, 
        leadId: lead.id,
        sessionId: sessionId
      };
      console.log('Chat request body:', requestBody);
      
      // Make the api call
      const data = await api.generateAI(lead.id, {
        context: currentInput,
        sessionId: sessionId
      });
      
      // Update sessionId if it changed (shouldn't happen, but safety)
      if (data.sessionId && data.sessionId !== sessionId) {
        console.log('SessionId changed:', data.sessionId);
        setSessionId(data.sessionId);
      }
      
      try {
        const emailData = JSON.parse(data.content);
        console.log('Parsed chat email data:', emailData);
        
        // Update email fields
        setEmailSubject(emailData.email_subject);
        setEmailBody(emailData.email_body);
        
        // Add explanation to chat
        const aiMessage = { sender: 'ai', text: emailData.strategy_explanation };
        setChatMessages(prev => [...prev, aiMessage]);
        
      } catch (parseError) {
        console.error('Chat JSON parsing failed:', parseError);
        // Fallback to treating as plain text
        const aiMessage = { sender: 'ai', text: data.content };
        setChatMessages(prev => [...prev, aiMessage]);
      }
      
    } catch (error) {
      console.error('=== Chat Message Error ===');
      console.error('Chat error details:', error);
      const errorMessage = { sender: 'ai', text: 'Sorry, something went wrong. Please try again.' };
      setChatMessages(prev => [...prev, errorMessage]);
    }
    
    setIsLoading(false);
  };