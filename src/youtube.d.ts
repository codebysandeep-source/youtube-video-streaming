declare global {
  namespace YT {
    class Player {
      constructor(HTML_Video_Display_ID: string, options: PlayerOptions);
      destroy(): void;
      playVideo(): void;
    }

    interface PlayerOptions {
      videoId: string;
      height: string;
      width: string;
      playerVars: PlayerVars,
      events: {
        onReady: (event: PlayerEvent) => void;
        onStateChange: (event: OnStateChangeEvent) => void;
      }
    }

    interface PlayerEvent {
      target: YT.Player;
    }

    interface OnStateChangeEvent {
      data: number;
    }

    interface PlayerVars {
      autoplay?: number; // Set to 0 to disable auto-play
      controls?: number; // Set to 0 to hide player controls
      enablejsapi?: number; // Set to 1 to enable JavaScript API
      loop?: number; // Set to 0 to disable video looping
      modestbranding?: number; // Set to 1 to hide YouTube logo
      rel?: number; // Set to 0 to disable related videos
      showinfo?: number; // Set to 0 to hide video title and uploader info
    }

  }

  interface Window {
    onYouTubeIframeAPIReady(): void;
  }
}

export {};
