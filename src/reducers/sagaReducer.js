import SongItem from "../components/SongItem";
import { createReducer } from "@reduxjs/toolkit";
import { EDIT_MUSIC_ITEM_SUCCESS, OPERATION_FAILED,OPERATION_SUCCESS, UPDATE_STATE_FAILED, UPDATE_STATE_SUCCESS } from "../action/actions";
import { MUSIC_ADD_FAILED,MUSIC_ADD_SUCCESS } from "../action/actions";
import { MAKE_DISPLAYER_CONTENT_SUCCESS,MAKE_DISPLAYER_CONTENT_EMPTY_SUCCESS } from "../action/actions";
import { DELETE_MUSIC_ITEM_SUCCESS } from "../action/actions";
import DisplayerDefaultContent from "../components/DisplayerDefaultContent";

const initialState = {
    OperationError:null,
    data:[],
    leftPanelContent:<DisplayerDefaultContent />,
    notification:null,
    uploadingContent:null,

     
};
const sagaReducer = createReducer(initialState,(builder)=>{

    builder.addCase(OPERATION_SUCCESS,(state,action)=>{
        console.log("song id");
        var songitems =[];
        for(var song of action.data) {
              var items = {};
              var index_key = `${song.id}`;
              items.content = <SongItem key={index_key} mykey={index_key} singerName={song.userName} songTitle={song.albums[0].title} albumPhoto={song.albumPhoto[0].thumbnailUrl} />
              items.id = index_key;
              items.singerName = song.userName;
                items.songTitle = song.albums[0].title;
              items.albumPhoto = song.albumPhoto[0].thumbnailUrl;

                console.log("song id",items);
              songitems.push(items);
        }
        
        state.data=songitems;
         
    }).addCase(OPERATION_FAILED,(state,action)=>{
        state.error=action.error;

    }).addCase(MAKE_DISPLAYER_CONTENT_SUCCESS,(state,action)=>{

        state.leftPanelContent = action.payload;

    }).addCase(EDIT_MUSIC_ITEM_SUCCESS,(state,action)=>{

        console.log("is everything okay");
        var updated_data = action.formdata;
        var songitems =[];
        for(var song of state.data) {
            
            if(song.id === updated_data.itemKey){
                
                song.content = <SongItem key={song.id} mykey={song.id} singerName={updated_data.name} songTitle={updated_data.title} albumPhoto={song.albumPhoto} />
                song.singerName = updated_data.name;
                song.songTitle = updated_data.title;
                //items.id = index_key;
            }
              
              songitems.push(song);
        }
        state.data = songitems;

    }).addCase(UPDATE_STATE_FAILED,(state,action)=>{

        state.error = action.error;
    }).addCase(UPDATE_STATE_SUCCESS,(state,action)=>{

         state.uploadingContent = action.payload;

    }).addCase(MUSIC_ADD_SUCCESS,(state,action)=>{

        console.log("is this okay till now",action.postedData);
        var newData = action.postedData;
        var items = {};
        console.log("indexing",newData.id)
        var index_key = `${newData.id}`;
        var newSongItem = <SongItem key={index_key} mykey={index_key} singerName={newData.name} songTitle={newData.album.title} albumPhoto={newData.albumPhoto.thumbnailUrl} />
          items.content = newSongItem;
          items.id = index_key
          items.singerName = newData.name;
          items.songTitle = newData.album.title;
          items.albumPhoto =newData.albumPhoto.thumbnailUrl
        state.data.unshift(items);

    }).addCase(MUSIC_ADD_FAILED,(state,action)=>{

    }).addCase(MAKE_DISPLAYER_CONTENT_EMPTY_SUCCESS,(state,action)=>{

        state.leftPanelContent = <DisplayerDefaultContent />
    }).addCase(DELETE_MUSIC_ITEM_SUCCESS,(state,action) =>{
         var index = action.index;
         
         var items = state.data.filter((song)=>{

            return song.id !== index;
         })
         state.data = items;
         

    }).addDefaultCase(()=>{

    });
});
export default sagaReducer;
