
window.onload = function(){
	//instagramRecentBlog()
	instagram();
}

function instagram(){
	var feed = new Instafeed({
        get: 'user',
        userId : 4166783850,
        clientId: 'af7d8c43b93c4d5ca36ba855c6014000',
        accessToken: '4166783850.af7d8c4.0e4fee06499740a18f486d3f323c6990',
        success: function (result) {
        	console.log(result)
        }
    });
    feed.run();
}

