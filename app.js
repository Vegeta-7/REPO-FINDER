// Main Var
let theInput=document.querySelector('.get-repos input');
let getButton=document.querySelector('.get-button')
let reposData=document.querySelector('.show-data')

getButton.onclick=function(){
    getRepos();
}
// Get Repos
function getRepos(){
    if(theInput.value==""){
        reposData.innerHTML="<span>Please Write a GitHub Username.</span>";
    }else{
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response)=>{
            return response.json();
        })
        .then((repositories)=>{
            //Empty the container
            reposData.innerHTML=''

            //Loop on REpos
            repositories.forEach(repo => {                
                //Create Main Div ele
                let mainDiv=document.createElement('div');

                //create repo name text
                let repoName=document.createTextNode(repo.name);

                //append text on main div
                mainDiv.appendChild(repoName);

                //create repo url anchor
                let theUrl=document.createElement('a');

                // Create Repo Url Text
                let theUrlText=document.createTextNode('Visit')

                //Append the Repo Url Text to anchor tag
                theUrl.appendChild(theUrlText);

                //Add the hypertext ref "href"
                theUrl.href=`https://github.com/${theInput.value}/${repo.name}`

                //set attribute blank
                theUrl.setAttribute('target','_blank')

                //append url anchor to main div
                mainDiv.appendChild(theUrl);

                // Create Stars Count Span
                let StarsSpan=document.createElement('span');

                // Create Stars Count Text
                let StarsText=document.createTextNode(`Stars ${repo.stargazers_count}`);

                //Add stars text to span
                StarsSpan.appendChild(StarsText)

                // Add Span to mainDiv
                mainDiv.appendChild(StarsSpan)

                // Add Class on Main Div
                mainDiv.className='repo-box';

                //append main div to container
                reposData.append(mainDiv);
            });
        })
    }
}