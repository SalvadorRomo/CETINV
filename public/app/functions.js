CetiInv.factory('toolsFactory',['$rootScope','$auth' ,'$q',function($rootScope,$auth,$q ){
   
    var socket = io.connect('http://localhost:8080',{
        query : {
            token : 'token'
        }
     });

    return {        
        validateHeaders : function(headerNames){

                var listError = []; 
                var stringErr = '';

                for(var it = 0; it < headerNames.length ; it ++){
					if(headerNames[it].indexOf(' ') > 0){
						listError.push(headerNames[it].replace(/ /g,''));
                            }
                        }		
                if(listError.length > 0 ){
                        for(var it = 0; it < listError.length ; it ++){
                                if(it == listError.length - 1){
                                    stringErr += listError[it];
                                }
                                else{
                                stringErr += listError[it] + ', '
                            }
                        }                   
                        return  $q.reject('Hay espacios en los siguientes encabezados del archivos de excel : ' + stringErr);
                        }else{       
                         return $q.resolve('Campos Validos');
                        }                          
        } ,
        on:function(eventName, callback){
                socket.on(eventName,callback);
        },
        emit: function(eventName,data){
                socket.emit(eventName.data);
        }, 

       validate: function(){
            
            if(!$auth.isAuthenticated()){
                    return $q.reject(false);                   
                }
                else{
                    return $q.resolve(true);
                }            
        }

    }
}]);