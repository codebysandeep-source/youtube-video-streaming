import { Component, OnDestroy, OnInit } from '@angular/core';

// Define PlayerState enum manually
enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5
}

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit, OnDestroy{
  private player : YT.Player | undefined;
  frameLoop : any = ["Titli","Galliyan","Akhiyaan Gulaab","Jeene Laga Hoon","Thoda Thoda Pyaar","Hawa Banke"];
  private videoId: any[] = [
    this.extractVideoId("https://www.youtube.com/watch?v=Uoi2jjr6RGw"),
    this.extractVideoId("https://www.youtube.com/watch?v=iGZYgHA1a1s"),
    this.extractVideoId("https://www.youtube.com/watch?v=GvXDq-P1NB8"),
    this.extractVideoId("https://www.youtube.com/watch?v=qpIdoaaPa6U"),
    this.extractVideoId("https://www.youtube.com/watch?v=USccSZnS8MQ"),
    this.extractVideoId("https://www.youtube.com/watch?v=QCXaa1mEUK0"),
  ];

  constructor(){
     //Load the YouTube IFrame Player API asynchronously
    this.YoutubeIFramePlayerAPI();
  }


  //YouTube IFrame Player API asynchronously
  YoutubeIFramePlayerAPI(){
    if (!window['YT']) {
      let tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      let firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }
  }


  ngOnInit(): void {
    // Initialize the YouTube player after the YouTube IFrame Player API is ready
    window['onYouTubeIframeAPIReady'] = () => this.initPlayer();
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.destroy();
    }
  }

  initPlayer() {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      // YouTube API is not yet loaded, retry after a short delay
      setTimeout(() => this.initPlayer(), 100);
      return;
    }

    this.frameLoop.forEach((e:any,i:number) => {

      // Initialize the YouTube player
      this.player = new YT.Player('player'+i, {
        videoId: this.videoId[i],
        height: '300',
        width: '400',
        playerVars : {
          autoplay: 0, // Disable -> 0, Enable -> 1 auto-play
          controls: 1, // Hide-> 0, Show-> 1 player controls
          enablejsapi: 1, // Enable JavaScript API
          loop: 0, // Do not loop the video
          modestbranding: 1, // Hide YouTube logo
          rel: 0, // Disable related videos
          showinfo: 0 // Hide video title and uploader info
        },
        events: {
          'onReady': this.onPlayerReady.bind(this),
          'onStateChange': this.onPlayerStateChange.bind(this)
        }
      });

  });
  }


  onPlayerReady(event: any) {
    event.target.playVideo();
  }

  onPlayerStateChange(event: YT.OnStateChangeEvent) {
    if (event.data === PlayerState.ENDED) {
      // console.log("==> event.data: ", event.data);
    }
  }

  extractVideoId(url: string): string | null {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }


}
