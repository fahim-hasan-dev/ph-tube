
const mainHandler = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json()
    const categories = data.data

    // categories show
    const tabContainer = document.getElementById('tab-container');
    const arrId = [];
    categories.forEach(element => {
        const tab = document.createElement('div');
        tab.innerHTML = `
        <a onclick="categoryPost(${element.category_id})" class=" cursor-pointer px-4 py-2 rounded-md bg-gray-200">${element.category}</a> 
        `
        tabContainer.appendChild(tab);
        arrId.push(element.category_id)
    });
    
}


// category post show
let veryId = 'verify'
let imgBoxId ='imgBox'
let sorCategoryData;
const categoryPost = async(categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json()
    const posts = data.data;
    sorCategoryData = data.data
    const postContainer = document.getElementById('postContainer');

    
    postContainer.innerHTML = '';
        document.getElementById('noposts').innerText = '';
        posts.forEach(post => {
            veryId +=2;
            imgBoxId +=5;
           const div = document.createElement('div');
           div.innerHTML = `
           <div class="  bg-base-100 shadow-xl px-3 pt-5">
           <figure class="relative" id='${imgBoxId}'><img class='rounded-md w-[312px] h-[180px]' src='${post.thumbnail}' alt="Shoes" /></figure>
           <div class=" py-7 flex gap-3">
               <div>
                   <img class="rounded-full w-12 h-12" src='${post.authors[0].profile_picture}' alt="">
               </div>
               <div>
                   <h2 class=" text-xl font-medium">${post.title}</h2>
                   <div id='${veryId}'  class="flex gap-3 my-2">
                       <p class="text-lg font-medium text-gray-500 ">${post.authors[0].profile_name}</p>
                   </div>
                   <h3 class="text-lg font-medium text-gray-500"> ${post.others.views} Views</h3>
                   
               </div>
           </div>
       </div>
           `
        postContainer.appendChild(div);


        //    verify img set
        const veContainer = document.getElementById(veryId);
        if(post.authors[0].verified === true || post.authors[0].verified === ' ' ){
            const img = document.createElement('img');
            img.setAttribute('src','images/fi_10629607.jpg')
            img.classList.add('w-7')
            veContainer.appendChild(img)
        }


        // time set 
        const imgBoxTime = document.getElementById(imgBoxId)
        if(post.others.posted_date){
            const dateTime = (new String(((post.others.posted_date/60)/60).toFixed(2))).split('.');
            const div = document.createElement('div');
            div.innerHTML = `
                <h2 class=" px-2 py-1 rounded-lg bg-slate-900 inline text-white">${dateTime[0]} hrs ${dateTime[1]} min ago</h2>
            `
            div.classList.add('text-white', 'absolute', 'bottom-3', 'right-[45px]', 'md:right-[30px]','lg:right-[10px]')
            imgBoxTime.appendChild(div)
        }
        
       
           
        });

        // No post massage
        if(posts.length === 0){
            const nodatacontainer = document.getElementById('noposts');
            document.getElementById('noposts').innerText = '';
            const div = document.createElement('div');
            div.innerHTML = `
            <img class="mx-auto" src="images/Icon.png" alt="">
            <h1 class="text-3xl font-bold mt-4">Oops!! Sorry, There is no <br> content here</h1>
            `
            div.classList.add('mx-auto', 'text-center', 'mt-36')
            nodatacontainer.appendChild(div)
        }

        
    }

    

mainHandler();
categoryPost(1000);



//Post sort view
function sortView (){
    const sortPosts = sorCategoryData.sort((a,b) => b.others.views.slice(0, -1) - a.others.views.slice(0, -1));

    postContainer.innerHTML = '';
        document.getElementById('noposts').innerText = '';
        sortPosts.forEach(post => {
            veryId +=2;
            imgBoxId +=5;
           const div = document.createElement('div');
           div.innerHTML = `
           <div class="  bg-base-100 shadow-xl px-3 pt-5">
           <figure class="relative" id='${imgBoxId}'><img class='rounded-md w-[312px] h-[180px]' src='${post.thumbnail}' alt="Shoes" /></figure>
           <div class=" py-7 flex gap-3">
               <div>
                   <img class="rounded-full w-12 h-12" src='${post.authors[0].profile_picture}' alt="">
               </div>
               <div>
                   <h2 class=" text-xl font-medium">${post.title}</h2>
                   <div id='${veryId}'  class="flex gap-3 my-2">
                       <p class="text-lg font-medium text-gray-500 ">${post.authors[0].profile_name}</p>
                   </div>
                   <h3 class="text-lg font-medium text-gray-500"> ${post.others.views} Views</h3>
                   
               </div>
           </div>
       </div>
           `
        postContainer.appendChild(div);


        //    verify img set
        const veContainer = document.getElementById(veryId);
        if(post.authors[0].verified === true || post.authors[0].verified === ' ' ){
            const img = document.createElement('img');
            img.setAttribute('src','images/fi_10629607.jpg')
            img.classList.add('w-7')
            veContainer.appendChild(img)
        }


        // time set 
        const imgBoxTime = document.getElementById(imgBoxId)
        if(post.others.posted_date){
            const dateTime = (new String(((post.others.posted_date/60)/60).toFixed(2))).split('.');
            const div = document.createElement('div');
            div.innerHTML = `
                <h2 class=" px-2 py-1 rounded-lg bg-slate-900 inline text-white">${dateTime[0]} hrs ${dateTime[1]} min ago</h2>
            `
            div.classList.add('text-white', 'absolute', 'bottom-3', 'right-[45px]', 'md:right-[30px]','lg:right-[10px]')
            imgBoxTime.appendChild(div)
        }
        
       
           
        });
         // No post massage
         if(sortPosts.length === 0){
            const nodatacontainer = document.getElementById('noposts');
            document.getElementById('noposts').innerText = '';
            const div = document.createElement('div');
            div.innerHTML = `
            <img class="mx-auto" src="images/Icon.png" alt="">
            <h1 class="text-3xl font-bold mt-4">Oops!! Sorry, There is no <br> content here</h1>
            `
            div.classList.add('mx-auto', 'text-center', 'mt-36')
            nodatacontainer.appendChild(div)
        }


        
}


