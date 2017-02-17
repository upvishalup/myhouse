

window.onload = function(){
	//instagram();
    facebook();
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

function facebook(){
    
/*
    var permissions = [
          'email'
          ].join(',');

           var fields = [
          'id',
          'name',
          'first_name',
          'middle_name',
          'last_name',
          'gender',
          'locale',
          'languages',
          'link',
          'third_party_id',
          'installed',
          'timezone',
          'updated_time',
          'verified',
          'age_range',
          'bio',
          'birthday',
          'cover',
          'currency',

          'devices',
          'education',
          'email',
          'hometown',
          'interested_in',
          'location',
          'political',
          'payment_pricepoints',
          'favorite_athletes',
          'favorite_teams',
          'picture','quotes',
          'relationship_status',
          'religion',
          'significant_other',
          'video_upload_limits',
          'website',
          'work'
          ].join(',');*/
    
    FB.login(function(response)
    {   
        console.log(response);
       if(response.status==='connected')
          {
            FB.api('/me', {fields: fields}, function(response) {
                console.log(response);
            });
          }
      else if(response.status==='not_authorized')
          {
            console.log("Facebook not authorised");
          }
    });

    
}

}

