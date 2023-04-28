# Progressify: Project Management tool powered by AI
**Progressify**  is a Project Management tool that automates task allotment and also keeps track of teammates' sentiments. It automatically classifies tasks by the given description and assigns them to a suitable teammate. How Progressify does it? (Short answer: MindsDB and Supabase) read ahead.😁

Progressify uses models like  [facebook/bart-large-mnli](https://huggingface.co/facebook/bart-large-mnli)  to classify tasks by taking task description as input and assigning it to a suitable teammate. This saves a lot of time that might get wasted in doing the same manually.

For sentiment analysis progressify uses  [cardiffnlp/twitter-roberta-base-sentiment](https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment). It analyzes team discussion in an inbuilt team chat feature and gives the output describing the sentiment of the members and what can be done to make it better.

To check out Progressify you can visit:  [https://progressify.vercel.app/](https://progressify.vercel.app/)

Demo team admin login credentials :

**email:  [john@gmail.com](mailto:john@gmail.com)**

**password: testpassword**

Demo teammate login credentials:

**email:  [geralt@gmail.com](mailto:geralt@gmail.com)**

**password: testpassword**

## [](https://techbyakash.hashnode.dev/progressify-project-management-tool-powered-by-ai#heading-technologies-used "Permalink")Technologies used

-   Web Framework :  **NextJS**
    
-   Database :  **Supabase**
    
-   Styling :  **TailwindCSS**
    
-   **MindsDB Cloud Console (**[https://cloud.mindsdb.com](https://cloud.mindsdb.com/editor))
    
-   [**MindsDB Javascript SDK**](https://github.com/mindsdb/mindsdb-js-sdk)
    
-   Github link :  [https://github.com/heyyakash/ProjectMgmt](https://github.com/heyyakash/ProjectMgmt)
    

## [](https://techbyakash.hashnode.dev/progressify-project-management-tool-powered-by-ai#heading-lets-talk-features "Permalink")Lets Talk Features

### [](https://techbyakash.hashnode.dev/progressify-project-management-tool-powered-by-ai#heading-automated-task-assignment "Permalink")Automated Task Assignment🌟

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1682691014756/12830720-b6ad-484e-8257-0b3232c8d3e5.png?auto=compress,format&format=webp)

Let's say we give a task description as "_Create an app that allows users to track their health metrics such as blood pressure, heart rate, and sleep quality. You can include features such as personalized health insights, goal setting, and reminders_" The following output is generated.

![Task](https://cdn.hashnode.com/res/hashnode/image/upload/v1682691229192/6f002768-9ce0-483f-aaca-0d2d38a36096.png?auto=compress,format&format=webp)

The task is classified and assigned..!

### [](https://techbyakash.hashnode.dev/progressify-project-management-tool-powered-by-ai#heading-how-does-this-happen "Permalink")How does this happen ?

First, the classification takes place, i.e what type of skill will the task require. The model used for this zero-shot-classification is  [facebook/bart-large-mnli](https://huggingface.co/facebook/bart-large-mnli). Currently, the model is trained to classify the task into 4 categories namely, Web Development, Mobile App Development, DevOps and marketing.

Let's see step by step

1.  Head over to  [https://mindsdb.com/](https://mindsdb.com/)  and create a free account
    
2.  After logging in spin up a cloud editor at  [https://cloud.mindsdb.com/editor](https://cloud.mindsdb.com/editor)
    
3.  For training the model run the following SQL query in the cloud editor

    
    ```
     CREATE MODEL mindsdb.zeroshotsummarizer       
     PREDICT result                           
     USING
       engine = 'huggingface',                      
       task = 'zero-shot-classification',                      
       model_name = 'facebook/bart-large-mnli',  
       candidate_labels = ['Web Development', 'Mobile App', 'Marketing','DevOps'],
       input_column = 'task_desc';
    
    ```
    
    We are predicting the  **result**  using the  **huggingface**  engine and  [facebook/bart-large-mnli](https://huggingface.co/facebook/bart-large-mnli)  and  **task_desc**  as input. We have provided 4 labels for classifcation -  **Web Development, Marketing, Mobile App**  and  **DevOps.**
    
4.  To predict the skill required pass the following query
    
    COPY
    
    COPY
    
    ```
     SELECT * FROM zeroshotsummarizer WHERE task_desc="Implement push notifications to keep users informed about updates, new features, or other important information.";
    
    ```
    
    This classifies the task as 'Mobile App'
    
5.  In order to use this in Progressify, I used mindsdb-js-sdk to connect to the cloud console.
    
    
    ```
     try {
         await MindsDB.connect({
         user: process.env.NEXT_PUBLIC_USER_EMAIL
         password: process.env.NEXT_PUBLIC_USER_PASSWORD
         })
     } catch (error) {
         return res.status(500).json({ msg: "Couldn't connect", success: false })
     }
         //fetching category using zero-shot classification
     const query  = `SELECT * FROM zeroshotsummarizer WHERE task_desc="${task}";`
     const result = await MindsDB.SQL.runQuery(query)
     const category = result.rows[0].result
    
    ```
    
6.  Progressify sends request to the built-in NextJS server where this code resides and it sends back the result to the application.
    
7.  Upon recieving the category the assigning part is handled by supabase

    ```
     const users = members?.filter((x) => x.skills === result.category) 
     const { error } = await supabase.from("tasks").insert({
                             company,
                             team,
                             task_desc,
                             category,
                             assigned_to: //user that has the skill
                             //etc.....
                         })
    
    ```
    
    First members are filtered that have the skills and then the task is added to the database.
    
8.  If no user is found and error is shown.
    

## [](https://techbyakash.hashnode.dev/progressify-project-management-tool-powered-by-ai#heading-inbuilt-team-chat-feature "Permalink")Inbuilt team chat feature💬

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1682703774861/bfa9f1ec-6ae4-470c-8674-a9d94bc1d3f6.png?auto=compress,format&format=webp)

Chat feature is imlemented using Supabases' realtime functionality (it is one of the reasons I chose Supabase). Team members can chat or have discussions and this also forms the basis of sentiment analysis that we will see in the following section.

## [](https://techbyakash.hashnode.dev/progressify-project-management-tool-powered-by-ai#heading-team-sentiment-analysis "Permalink")Team sentiment analysis 🙇🏽‍♀️ 🙇🏽 🙇🏽‍♂️

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1682705792463/219e6b13-a3ec-43a8-bf21-a6ad65b11e3c.png?auto=compress,format&format=webp)

Team sentiment analysis helps the admin in regulating the team members and also analyze their own behavior. Team sentiment analysis indicates the team's health and may reflect potential conflicts also.

So much work is being assigned to individuals these days hence it becomes necessary to check their behaviors and give them required breaks to keep the team productive and effiicient.

For chat analysis, Progressify uses  **huggingface's twitter-roberta-base-sentiment**  model.

Here's how to do it:

1.  Log into the MindsDB cloud console and run the following query to train the model
    

    
    ```
     CREATE MODEL sentiment_classifier
     PREDICT sentiment
     USING engine='huggingface',
       model_name= 'cardiffnlp/twitter-roberta-base-sentiment',
       input_column = 'chat',
       labels=['negative','neutral','positive'];
    
    ```
    
    Here we are training the model to classify the chats into 3 categories - Negative, Neutral and Positive.
    
2.  Run the following query to use the model
   
    
    ```
     SELECT input.message, model.sentiment, input.email , input.company, input.team
     FROM NEWDB.Chats AS input
     JOIN sentiment_analyzer AS model
     WHERE input.company='COMPANY_NAME' AND input.team='TEAM_NAME'
    
    ```
    
    Initilally all chats are being classified whether it belongs to the requesting company or not and then only those that belong to the requesting company and team are returned.
    
3.  Again Progressify send a request with company name and team name to the server running following code

    
    ```
     const { company, team } = req.body
     try {
         await MindsDB.connect({
         user: process.env.NEXT_PUBLIC_USER_EMAIL as string,
         password: process.env.NEXT_PUBLIC_USER_PASSWORD as string
         })
         const query = `SELECT input.message, model.sentiment,             input.email , input.company, input.team
                 FROM NEWDB.Chats AS input
                 JOIN sentiment_analyzer AS model
                 WHERE input.company='${company}' AND     input.team='${team}';`
         const queryResult = await MindsDB.SQL.runQuery(query)
         res.status(200).json({result:queryResult.rows})
     }
     catch (err) {
         res.status(500).json(err)
     }
    
    ```
    
4.  The recieved data is passed on to the charts to get the visual representation of the team's sentiment.
    

## [](https://techbyakash.hashnode.dev/progressify-project-management-tool-powered-by-ai#heading-built-in-calendar-for-setting-deadline "Permalink")Built-in Calendar for setting deadline📅

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1682707645461/b273e918-92eb-419e-b186-a855a757b37e.png?auto=compress,format&format=webp)

Set task deadlines easily using the calendar (That's the only way! lol).

In order to add a task follow the following

1.  Click on Add task on top right and select the deadline date or click on calendar icon in the navbar.
    
2.  Once selected the deadline date you will be directed to the the form that requires you to fill task description.
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1682708634106/8251caee-2620-4419-9540-afa520ad00a2.png?auto=compress,format&format=webp)
    
3.  If you want to create a new project go ahead and give the project name or you can also select any existing projects from the dropdown box.
    
4.  Click on assign then sit back and see the magic happen ✨.
    
5.  Your task will be automatically assigned to the suitable teammate.
    

Using Progressify is pretty simple and easy.

## [](https://techbyakash.hashnode.dev/progressify-project-management-tool-powered-by-ai#heading-how-do-i-add-teammates "Permalink")How do I add Teammates?

1.  Teammates can be added by the admin only.
    
2.  In order to click on the + button on the top right corner.
    
3.  You will be greeted with a form which would require you to fill user's details, even email, password and skills. After filling the form the user will be added to the team and their profile picture will be visible on the top right cornor.
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1682710584171/ad6bba98-9111-4b1f-868b-e01c6ecea960.png?auto=compress,format&format=webp)
    

## [](https://techbyakash.hashnode.dev/progressify-project-management-tool-powered-by-ai#heading-video-demo "Permalink")Video Demo

## [](https://techbyakash.hashnode.dev/progressify-project-management-tool-powered-by-ai#heading-problems-i-ran-into "Permalink")Problems I ran into

-   Late Response of the api call that fetches category from mindsdb cloud console. Few times the api takes too long to respond and timout happens
    
-   Fetching data from MindsDB in getServerSideProps increased the page load time (that could be due to amount of data being fetched) that led to fetching the data on Client Side.
    

## [](https://techbyakash.hashnode.dev/progressify-project-management-tool-powered-by-ai#heading-sooooo-why-progressify "Permalink")Sooooo... Why Progressify?

I'm assuming you are not asking about the name (ChatGPT's Idea) rather about the concept.

So basically I was thinking about making projects that would automate tasks as much as possible and save time also.  [Hashnode](https://hashnode.com/)  and MindsDB came at the perfect time. I have known about MindsDB (through Twitter ads 😏) but never explored it. When I started exploring it I saw that its concept is really great and it could open loads of opportunities for future projects.

It makes ML model integration so easy with your web application, it's no joke. I would love to make more projects using MindsDB because it is an amazing technology.

Progressify can be much more and I will keep working on it in the future. Loads of features can be added and existing features can be extended. I look forward to working on it.

## [](https://techbyakash.hashnode.dev/progressify-project-management-tool-powered-by-ai#heading-in-the-end "Permalink")In the end...

I would like to thank  [MindsDB](https://mindsdb.com/)  and  [Hashnode](https://hashnode.com/)  for providing me with this wonderful opportunity to build a good project.

Thanks!!❤️

Bye 🫡
