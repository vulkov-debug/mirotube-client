import React, { useState, useRef, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ReactPlayer from "react-player";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Controls from "./PlayerControls";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { LoadingOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  playerWrapper: {
    width: "100%",
    position: "relative",
    
  },

  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topControls: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  middleControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomWrapper: {
    display: "flex",
    flexDirection: "column",

    // background: "rgba(0,0,0,0.6)",
    // height: 60,
    padding: theme.spacing(2),
  },

  bottomControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // height:40,
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#777",

    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },

  volumeSlider: {
    width: 100,
  },
}));

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

const Player = ({ url, title, onEnded, loop }) => {
  const handle = useFullScreenHandle();
  const classes = useStyles();
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [bookmarks, setBookmarks] = useState([]);
  const [ready, setReady] = useState(false);
  const [state, setState] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,
    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 0.3,
    seeking: false,
  });
  const [ok, setOk] = useState(false);

  useEffect(() => {
    setOk(!ok);
  }, [ready]);

  useEffect(()=> {
    setBookmarks([])
  },[url])

  const playerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    playing,
    controls,
    light,

    muted,
    
    playbackRate,
    pip,
    played,
    seeking,
    volume,
  } = state;

  const [fullScreen, setFullScreen] = useState(false);

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    if (count > 2) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    if (controlsRef.current.style.visibility == "visible") {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    // screenfull.toggle(playerContainerRef.current);
    if (fullScreen === false) {
      handle.enter();
      setFullScreen(true);
    } else {
      handle.exit();
      setFullScreen(false);
    }
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat == "normal" ? "remaining" : "normal"
    );
  };

  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const addBookmark = () => {
    const canvas = canvasRef.current;
    canvas.width = 160;
    canvas.height = 90;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      playerRef.current.getInternalPlayer(),
      0,
      0,
      canvas.width,
      canvas.height
    );
    const dataUri = canvas.toDataURL();
    canvas.width = 0;
    canvas.height = 0;
    const bookmarksCopy = [...bookmarks];
    bookmarksCopy.push({
      time: playerRef.current.getCurrentTime(),
      display: format(playerRef.current.getCurrentTime()),
      image: dataUri,
    });
    setBookmarks(bookmarksCopy);
  };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const elapsedTime =
    timeDisplayFormat == "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  return (
    <Container>
      <div
        hidden={!ready}
        className={classes.playerWrapper}
        onMouseMove={handleMouseMove}
        onMouseLeave={hanldeMouseLeave}
      >
        <FullScreen handle={handle}>
          <ReactPlayer
            ref={playerRef}
            width="100%"
            height="100%"
            url={url}
            pip={pip}
            playing={playing}
            controls={false}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onProgress={handleProgress}
            onEnded={onEnded}
            onReady={() => {
              setReady(true);
              console.log("readyy");
            }}
            config={{
              file: {
                attributes: {
                  crossOrigin:'anonymous'
                },
              },
            }}
          />

          <Controls
            ref={controlsRef}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            onDuration={handleDuration}
            onRewind={handleRewind}
            onPlayPause={handlePlayPause}
            onFastForward={handleFastForward}
            playing={playing}
            played={played}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            onMute={hanldeMute}
            muted={muted}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekDown={handleVolumeSeekDown}
            onChangeDispayFormat={handleDisplayFormat}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            onToggleFullScreen={toggleFullScreen}
            volume={volume}
            onBookmark={addBookmark}
            title={title}
          />
        </FullScreen>
      </div>
      <div hidden={ready}>
        <LoadingOutlined
          className="d-flex justify-content-center display-1 text-primary p-5 m-5"
          spin
        />
      </div>

      <Grid container style={{ marginTop: 0 }} spacing={3}>
        {bookmarks.map((bookmark, index) => (
          <Grid key={index} item>
            <Paper
              onClick={() => {
                playerRef.current.seekTo(bookmark.time);
                controlsRef.current.style.visibility = "visible";

                setTimeout(() => {
                  controlsRef.current.style.visibility = "hidden";
                }, 1000);
              }}
              elevation={3}
            >
              <img crossOrigin="anonymous" src={bookmark.image} />
              <Typography variant="body2" align="center">
                bookmark at {bookmark.display}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    <canvas ref={canvasRef} hidden={!bookmarks.length}/>
    </Container>
  );
};

export default Player;
