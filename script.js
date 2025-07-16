const css = `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
        html {
            font-size: 16px;
        }

        @media (max-width: 360px) {
            html {
                font-size: calc(100vw / 360 * 16);
            }
        }

        :root {
            --text-color: #ffffff;
            --wechat-green-icon: #07C160;
            --wechat-green-bubble: #95EC69;
            --wechat-bg: #EDEDED;
            --footer-height: 2.8125rem;
            --panel-height: 14.0625rem;
            --link-color: #576B95;
            --elegant-gold: #F9EECC;
            --unread-red: #FA5151;
            --wechat-red-packet: #EE5E53;
        }
        body {
            margin: 0;
            padding: 1.25rem;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            background: transparent;
            font-family: 'Noto Sans SC', sans-serif;
        }

        .phone-frame {
            max-width: 360px;
            width: 100%;
            padding: 0.6rem;
            background: #B4B3BB;
            border-radius: 3.125rem;
            box-shadow: inset 0 0 0.25rem 0.125rem rgba(0,0,0,0.8), 0 0.125rem 0.3125rem rgba(0,0,0,0.3), 0 0.9375rem 2.1875rem -0.625rem rgba(0,0,0,0.7), inset 0 0 0 0.0625rem rgba(255,255,255,0.05), 0 0 0 0.0625rem rgba(30,30,30,1);
            position: relative;
        }
        
        #hidden-send-trigger {
            position: absolute;
            top: 0.625rem;
            left: 50%;
            transform: translateX(-50%);
            width: 8.4375rem;
            height: 2rem;
            z-index: 999;
            cursor: pointer;
        }

        .phone-screen {
            height: 48.75rem;
            border-radius: 2.25rem;
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
            background-color: #000;
        }
        
        #delete-mode-trigger {
            position: absolute;
            top: 5px;
            left: 5px;
            width: 35px;
            height: 35px;
            z-index: 101; /* Above dynamic island */
            cursor: pointer;
        }
        
        .dynamic-island {
            position: absolute;
            top: 0.625rem;
            left: 50%;
            transform: translateX(-50%);
            width: 8.4375rem;
            height: 2rem;
            background: #000;
            border-radius: 1rem;
            z-index: 100;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #555;
            font-weight: bold;
            font-size: 0.9em;
            letter-spacing: 0.1em;
            cursor: pointer;
        }

        #island-text span {
            display: inline-block;
            transition: transform 0.3s ease-out;
        }

        @keyframes wave-bounce {
            0%, 40%, 100% { transform: translateY(0); }
            20% { transform: translateY(-4px); }
        }

        #island-text.is-generating span {
            animation: wave-bounce 1.2s infinite;
        }
        #island-text.is-generating span:nth-child(1) { animation-delay: 0s; }
        #island-text.is-generating span:nth-child(2) { animation-delay: 0.1s; }
        #island-text.is-generating span:nth-child(3) { animation-delay: 0.2s; }
        #island-text.is-generating span:nth-child(4) { animation-delay: 0.3s; }


        .app-view { 
            position: absolute; 
            top: 0; 
            left: 0; 
            right: 0; 
            bottom: 0; 
            z-index: 60; 
            visibility: hidden; 
            opacity: 0; 
            transition: opacity 0.3s ease, visibility 0.3s ease; 
            display: flex; 
            flex-direction: column;
            border-radius: inherit;
            overflow: hidden;
        }
        .app-view.active { visibility: visible; opacity: 1; z-index: 80;}
        .app-screen { padding: 3.75rem 1rem 1.375rem 1rem; flex-grow: 1; background-image: url('https://files.catbox.moe/bialj8.jpeg'); background-size: cover; background-position: center; }
        .app-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .app-icon { display: flex; flex-direction: column; align-items: center; text-align: center; text-decoration: none; cursor: pointer; position: relative; }
        .app-icon .icon-image { width: 4.0625rem; height: 4.0625rem; background-color: #333; border-radius: 22.5%; margin-bottom: 0.4375rem; background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; font-size: 2.2em; transition: transform 0.2s ease; }
        .app-icon:hover .icon-image { transform: scale(1.05); }
        .app-icon .app-name { color: var(--text-color); font-size: 0.75em; font-weight: 400; text-shadow: 0 0.0625rem 0.125rem rgba(0,0,0,0.5); }
        .icon-wechat { background: var(--wechat-green-icon); color: white; }
        .icon-settings { background: #8e8e93; color: white; }
        
        .unread-badge {
            position: absolute;
            top: -0.25rem;
            right: -0.25rem;
            background-color: var(--unread-red);
            color: white;
            border-radius: 50%;
            padding: 0.1em 0.4em;
            font-size: 0.75em;
            font-weight: bold;
            min-width: 1rem;
            height: 1rem;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 1;
            border: 1px solid #B4B3BB;
        }

        #settings-view { background-color: #F2F2F7; }
        .settings-header { flex-shrink: 0; display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; background: #F7F7F7; border-bottom: 0.0625rem solid #E2E2E2; padding-top: 2.8125rem; position: relative; z-index: 10; }
        .settings-header .back-btn { font-size: 1.2em; color: #000; cursor: pointer; }
        .settings-header .title { font-weight: 600; color: #000; font-size: 1em; position: absolute; left: 50%; transform: translateX(-50%); }
        .settings-body { flex-grow: 1; padding: 1.25rem; overflow-y: auto; }
        .settings-card { background-color: #fff; border-radius: 0.75rem; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .settings-card p { font-size: 0.9em; line-height: 1.6; color: #333; margin: 0 0 1rem 0; }
        .settings-card p:last-child { margin-bottom: 0; }
        .settings-card h4 { margin-top: 1.5rem; margin-bottom: 0.5rem; border-bottom: 1px solid #eee; padding-bottom: 0.3rem; }
        .settings-card h5 { margin-top: 1rem; margin-bottom: 0.5rem; }
        .settings-card .highlight { color: #8C541A; font-weight: bold; }
        .settings-card a { color: var(--link-color); text-decoration: none; font-weight: 500; }
        .settings-card a:hover { text-decoration: underline; }

        #wechat-chat-view {
            background-color: var(--wechat-bg);
        }

        .wechat-header {
            flex-shrink: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0.75rem;
            background: #F7F7F7;
            border-bottom: 0.0625rem solid #E2E2E2;
            padding-top: 2.8125rem;
            position: relative;
            z-index: 10;
        }

        .wechat-header .back-btn,
        .wechat-header .options-btn {
            font-size: 1.2em;
            color: #000;
            cursor: pointer;
        }

        .wechat-header .contact-name {
            font-weight: 600;
            color: #000;
            font-size: 1em;
            cursor: pointer;
        }

        .wechat-body {
            flex: 1 1 auto;
            overflow-y: auto;
            padding: 0.9375rem 0.5rem;
            /* Default background properties */
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
        }

        .message-row, .system-event-row {
            display: flex;
            margin-bottom: 1.125rem;
            align-items: flex-start;
        }
        .system-event-row {
            justify-content: center;
            align-items: center;
        }
        
        .message-row.me {
            justify-content: flex-end;
        }

        .timestamp-row {
            text-align: center;
            margin: 0.5rem 0;
            align-items: center;
        }

        .timestamp-text, .system-event-text {
            display: inline-block;
            background-color: #DADADA;
            color: #fff;
            font-size: 0.75em;
            padding: 0.1875rem 0.4375rem;
            border-radius: 0.25rem;
            max-width: 85%;
            white-space: normal;
            word-break: break-all;
            line-height: 1.4;
        }
        
        .recall-notice-container { display: inline-flex; flex-direction: column; align-items: center; }
        .recall-notice-text { cursor: pointer; display: inline-flex; align-items: center; justify-content: center; background-color: #DADADA; color: #fff; font-size: 0.75em; padding: 0.1875rem 0.4375rem; border-radius: 0.25rem; }
        .recall-content { color: #888; font-size: 0.75em; padding: 0; max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out, padding 0.3s ease-out; }
        .recall-content.expanded { max-height: 500px; padding: 0.3125rem 0 0 0; }

        .message-avatar {
            width: 2.25rem;
            height: 2.25rem;
            border-radius: 0.3125rem;
            flex-shrink: 0;
            object-fit: cover;
            background-color: #ccc;
            cursor:pointer;
        }

        .message-row.them .message-avatar {
            margin-right: 0.625rem;
        }

        .message-row.me .message-avatar {
            margin-left: 0.625rem;
        }
        
        .message-content-wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            max-width: calc(100% - 3.5rem);
        }
        .message-row.me .message-content-wrapper {
            align-items: flex-end;
        }

        .sender-name-label {
            font-size: 0.75em;
            color: #888;
            margin-bottom: 0.1rem; /* Fine-tuned margin */
            margin-left: 0.2rem;
        }

        .message-bubble {
            position: relative;
            padding: 0.5rem 0.625rem;
            border-radius: 0.3125rem;
            max-width: fit-content;
            font-size: 0.9em;
            line-height: 1.4;
            color: #000;
            word-break: break-word;
            user-select: none;
            box-sizing: border-box;
        }
        
        .message-bubble img { max-width: 10rem; max-height: 10rem; display: block; border-radius: 0.5rem; }

        .message-row.them .message-bubble {
            background: #fff;
        }

        .message-row.me .message-bubble {
            background: var(--wechat-green-bubble);
        }

        .message-bubble::after { content: ''; position: absolute; top: 13px; width: 0; height: 0; border-style: solid; }
        .message-row.them .message-bubble::after { left: -4px; border-width: 4px 5px 4px 0; border-color: transparent #fff transparent transparent; }
        .message-row.me .message-bubble::after { right: -4px; border-width: 4px 0 4px 5px; border-color: transparent transparent transparent var(--wechat-green-bubble); }
        .message-row.them .sender-name-label + .message-bubble { margin-top: 0; }
        .message-row.them .sender-name-label + .message-bubble::after {
            top: 13px; /* Keep arrow aligned with bubble top */
        }


        .message-row .message-bubble.sticker-bubble::after,
        .message-row .message-bubble.image-desc-bubble::after,
        .message-row .message-bubble.image-url-bubble::after,
        .message-row .message-bubble.location-bubble::after,
        .message-row .message-bubble.transfer-bubble::after,
        .message-row .message-bubble.file-bubble::after,
        .message-row .message-bubble.gift-bubble::after,
        .message-row .message-bubble.red-packet-bubble::after,
        .message-row .message-bubble.forward-bubble::after {
            content: none;
        }

        .message-row .message-bubble.sticker-bubble,
        .message-row .message-bubble.sticker-bubble img {
            background: transparent !important;
            padding: 0;
            max-width: 5.625rem; 
            max-height: 5.625rem;
        }

        .message-row .message-bubble.image-desc-bubble { background: transparent; padding: 0; }
        .message-row .message-bubble.image-url-bubble { background: transparent; padding: 0; }
        .message-row .message-bubble.image-url-bubble img { max-width: 10rem; max-height: 10rem; display: block; border-radius: 0.5rem; }

        .message-row .message-bubble.location-bubble,
        .message-row .message-bubble.transfer-bubble,
        .message-row .message-bubble.file-bubble,
        .message-row .message-bubble.red-packet-bubble,
        .message-row .message-bubble.forward-bubble {
            background: transparent;
            padding: 0;
            width: 12.5rem;
            max-width: 12.5rem;
        }
        .event-log-row { text-align: center; margin: 0.5rem 0; }
        .event-log-container { display: inline-flex; flex-direction: column; align-items: center; }
        .event-time-text {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: #DADADA;
            color: #fff;
            font-size: 0.75em;
            padding: 0.1875rem 0.4375rem;
            border-radius: 0.25rem;
            max-width: 85%;
            white-space: normal;
            word-break: break-all;
            line-height: 1.4;
        }
        .event-time-text.has-desc { cursor: pointer; }
        .event-description { color: #888; font-size: 0.75em; padding: 0; max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out, padding 0.3s ease-out; }
        .event-description.expanded { max-height: 500px; padding: 0.3125rem 0 0 0; }

        .message-bubble.voice-bubble { display: flex; align-items: center; cursor: pointer; min-width: 4.375rem; }
        .message-row.them .message-bubble.voice-bubble::after { content: ''; left: -4px; border-right-color: #fff; }
        .message-row.me .message-bubble.voice-bubble::after { content: ''; right: -4px; border-left-color: var(--wechat-green-bubble); }
        .voice-bubble .voice-icon { font-size: 1.1em; margin: 0 0.25rem;color: #333; }
        .message-row.them .voice-bubble .voice-icon { transform: rotate(90deg); }
        .message-row.me .voice-bubble .voice-icon { transform: rotate(270deg); }
        .voice-bubble .duration { font-size: 0.9em; margin: 0 0.25rem;}
        .voice-text-content { display: none; background-color: white; padding: 0.5rem 0.625rem; border-radius: 0.3125rem; border: 0.0625rem solid #E5E5E5; max-width: 65%; font-size: 0.9em; line-height: 1.4; color: #000; word-break: break-word; user-select: text; margin-top: 0.3125rem; box-shadow: 0 0.0625rem 0.125rem rgba(0,0,0,0.1); }
        .message-row.voice-text-visible .voice-text-content { display: block; }

        .image-desc-content { width: 8.4375rem;height: 8.4375rem;backdrop-filter: blur(10px); background-color: rgba(255, 255, 255, 0.5); border: 0.0625rem solid rgba(255, 255, 255, 0.2); border-radius: 0.5rem; padding: 0.5rem; color: #333; font-weight: 500; overflow-y: auto; word-wrap: break-word; box-sizing: border-box; font-size: 0.9em; }

        .location-bubble .location-card { background-color: #fff; border-radius: 0.3125rem; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .location-content { padding: 0.5rem; }
        .location-content .location-title { font-size: 1em; color: #000; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .location-content .location-subtitle { font-size: 0.75em; color: #888; }
        .location-map-placeholder { height: 5.625rem; position: relative; background-color: #e5e3df; overflow: hidden; }
        .location-map-placeholder::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: repeating-linear-gradient(45deg, #c8c6c3 0, #c8c6c3 4px, transparent 4px, transparent 8px), repeating-linear-gradient(135deg, #d1cfcc 0, #d1cfcc 3px, transparent 3px, transparent 7px), linear-gradient(to bottom, #b8b6b3 0%, #b8b6b3 100%), linear-gradient(to bottom, #dcdad7 0%, #dcdad7 100%), linear-gradient(to right, #b8b6b3 0%, #b8b6b3 100%), linear-gradient(to right, #dcdad7 0%, #dcdad7 100%), radial-gradient(ellipse at 20% 85%, #d4e5c7 30%, transparent 31%), radial-gradient(ellipse at 80% 30%, #cde2d0 40%, transparent 41%); background-size: 40% 35%, 30% 30%, 10px 100%, 6px 100%, 100% 10px, 100% 6px, 100% 100%, 100% 100%; background-position: -5% 110%, 100% 0%, 70% center, 70% center, center 35%, center 35%, 0 0, 0 0; background-repeat: no-repeat; }
        .location-map-placeholder::after { content: '\f3c5'; font-family: 'Font Awesome 6 Free'; font-weight: 900; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.8em; color: var(--wechat-green-icon, #07c160); text-shadow: 0 0 0.3125rem #fff; z-index: 10; }
        :root { --wechat-green-icon: #07c160; }

        .transfer-bubble .transfer-card { border-radius: 0.3125rem; overflow: hidden; width: 100%; }
        .transfer-card.transfer-initial { background-color: #F8963E; color: #fff; }
        .transfer-card.them { cursor: pointer; }
        .transfer-card.transfer-receipt { background-color: #f2d9bd; color: #5a4532; }
        .transfer-content { display: flex; align-items: center; padding: 0.75rem; }
        .transfer-icon-image { width: 2.25rem; height: 2.25rem; flex-shrink: 0; }
        .transfer-details { margin-left: 0.75rem; flex-grow: 1; }
        .transfer-details .amount { font-size: 1.1em; font-weight: bold; }
        .transfer-details .note, .transfer-details .status-text, .transfer-details .recipient-note { font-size: 0.8em; opacity: 0.9; }
        .transfer-initial .transfer-footer { color: #fff; border-top: 0.0625rem solid rgba(255,255,255,0.2); opacity: 0.8; }
        .transfer-receipt .transfer-footer { color: #8c735b; border-top: 0.0625rem solid rgba(140, 115, 91, 0.2); opacity: 0.8; }
        .transfer-footer { font-size: 0.75em; padding: 0.1875rem 0.75rem; }

        .file-bubble .file-card { background-color: #fff; border-radius: 0.3125rem; overflow: hidden; width: 100%; }
        .file-content { display: flex; align-items: center; padding: 0.75rem; gap: 0.75rem; }
        .file-icon { font-size: 2.5em; color: #666; flex-shrink: 0; }
        .file-details .file-name { font-size: 0.9em; color: #000; font-weight: 500; word-break: break-all; }
        .file-footer { background-color: #F7F7F7; color: #888; font-size: 0.75em; padding: 0.1875rem 0.75rem; border-top: 0.0625rem solid #EAEAEA; }
        
        .red-packet-bubble .red-packet-card { background-color: var(--wechat-red-packet); color: white; border-radius: 0.3125rem; overflow: hidden; cursor: pointer; }
        .red-packet-content { display: flex; align-items: center; padding: 0.75rem; gap: 0.75rem; }
        .red-packet-icon { font-size: 2.2em; color: #FAD986; }
        .red-packet-details .red-packet-title { font-size: 1em; font-weight: 500; }
        .red-packet-footer { font-size: 0.75em; padding: 0.1875rem 0.75rem; background: white; color: #aaa;}

        .wechat-input-area { flex-shrink: 0; background-color: #F7F7F7; position: relative; z-index: 10; }
        .wechat-input-area.disabled { display: none !important; }
        .wechat-footer { display: flex; align-items: center; gap: 0.4375rem; padding: 0.4375rem 0.625rem; border-top: 0.0625rem solid #E2E2E2; height: var(--footer-height); box-sizing: border-box; }
        .wechat-footer .footer-icon, .wechat-footer .send-btn { font-size: 1.6em; color: #555; cursor: pointer; flex-shrink: 0; }
        .wechat-footer .text-input { flex-grow: 1; border: none; background: #fff; padding: 0.4375rem 0.625rem; border-radius: 0.375rem; font-size: 0.9em; min-width: 0; }
        .wechat-footer .text-input:focus { outline: none; }
        .wechat-footer .text-input[disabled] { background-color: #f0f0f0; cursor: not-allowed; }
        .wechat-footer .text-input::placeholder { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #C6C6C6; }
        .wechat-footer .send-btn { background-color: var(--wechat-green-icon); color: white; border: none; width: 1.875rem; height: 1.875rem; border-radius: 0.375rem; font-size: 1em; cursor: pointer; display: none; flex-shrink: 0; padding: 0; line-height: 1.875rem; text-align: center; }
        .wechat-footer .send-btn:disabled { background-color: #A0D7B6; cursor: wait; }
        
        #observer-mode-footer {
            flex-shrink: 0;
            padding: 0.5rem;
            background-color: #F7F7F7;
            border-top: 1px solid #E2E2E2;
            display: flex;
            gap: 0.5rem;
            justify-content: space-around;
        }
        #observer-poke-btn, #observer-screenshot-btn {
            flex: 1;
            padding: 0.6rem;
            border: none;
            background: var(--wechat-green-icon);
            color: white;
            font-size: 0.9em;
            border-radius: 0.25rem;
            cursor: pointer;
        }
        #observer-screenshot-btn {
            background-color: #fff;
            color: #333;
            border: 1px solid #ddd;
        }
        #observer-poke-btn:disabled, #observer-screenshot-btn:disabled {
             background-color: #A0D7B6; cursor: wait;
        }


        .panel-container { height: 0; overflow: hidden; transition: height 0.3s ease; position: relative; }
        .panel-container.active { height: var(--panel-height); }
        .panel-view { display: none; height: 100%; overflow-y: auto; padding: 1.125rem 0.75rem; box-sizing: border-box; position: relative; } 
        .panel-view.active { display: block; }
        .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.125rem; }
        .feature-item { display: flex; flex-direction: column; align-items: center; cursor: pointer; position: relative; }
        .feature-icon { width: 3.375rem; height: 3.375rem; background-color: #fff; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; border: 0.0625rem solid #EFEFEF; margin-bottom: 0.4375rem; }
        .feature-icon img { max-width: 100%; max-height: 100%; border-radius: 0.5rem; object-fit: cover; }
        .feature-icon .fa-plus, .feature-icon .fa-camera-retro, .feature-icon .fa-share-alt { font-size: 2.2em; color: #B0B0B0; }
        .feature-label { font-size: 0.75em; color: #888; }
        
        .panel-pagination { position: absolute; bottom: 0.5rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.5rem; }
        .panel-dot { width: 0.5rem; height: 0.5rem; background-color: #ccc; border-radius: 50%; cursor: pointer; }
        .panel-dot.active { background-color: #888; }


        .message-row .message-bubble.gift-bubble { padding: 0; width: 12.5rem; max-width: 12.5rem; overflow: hidden; background-image: radial-gradient(white, rgba(255,255,255,0) 0.125rem), radial-gradient(white, rgba(255,255,255,0) 0.0625rem), radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,0) 0.125rem), radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,0) 0.0625rem); background-size: 3.125rem 3.125rem, 4.375rem 4.375rem, 5rem 5rem, 5.625rem 5.625rem; background-position: 0 0, 1.875rem 1.875rem, 0.625rem 2.5rem, 2.5rem 0.625rem; }
        .message-row.me .message-bubble.gift-bubble,
        .message-row.them .message-bubble.gift-bubble {
             background-color: #113b7d;
        }
        .gift-content { padding: 0.75rem; display: flex; align-items: center; gap: 0.75rem; color: var(--elegant-gold); }
        .gift-icon { font-size: 2.2em; }
        .gift-details .gift-name { font-size: 1.1em; font-weight: bold; }
        .gift-details .gift-price, .gift-details .gift-status-text, .gift-details .recipient-note { font-size: 0.8em; opacity: 0.9; }
        .gift-footer { color: #fff; font-size: 0.75em; padding: 0.1875rem 0.75rem; border-top: 0.0625rem solid rgba(249, 238, 204, 0.2); }

        #moments-view { background-color: #FFFFFF; color: #191919; }
        .moments-header { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; background: #F7F7F7; border-bottom: 0.0625rem solid #E2E2E2; padding-top: 2.8125rem; flex-shrink: 0; }
        .moments-header .title { font-weight: 600; font-size: 1em; }
        .moments-header .header-action { font-size: 1.2em; cursor: pointer; }
        .moments-body { flex-grow: 1; overflow-y: auto; background-color: #fff; }
        .moments-feed-header { position: relative; margin-bottom: 1.5625rem; }
        .moments-cover-photo { width: 100%; height: 14.0625rem; object-fit: cover; display: block; cursor: pointer; }
        .moments-user-info {
            position: absolute;
            bottom: -0.75rem;
            right: 0.75rem;
            display: flex;
            align-items: flex-end;
            gap: 0.75rem;
        }
        .moments-user-name {
            color: white;
            font-size: 1.1em;
            font-weight: bold;
            text-shadow: 0 0.0625rem 0.1875rem rgba(0,0,0,0.5);
            position: relative;
            bottom: 1.375rem;
            cursor: pointer;
        }
        .moments-user-avatar {
            width: 3.9375rem;
            height: 3.9375rem;
            border-radius: 0.5rem;
            object-fit: cover;
            cursor: pointer;
        }

        .user-signature {
            position: absolute;
            top: 4.25rem;
            right: 0;
            width: 14.0625rem;
            text-align: right;
            word-wrap: break-word;
            line-height: 1.4;
            color: #8a8a8a;
            font-size: 0.8em;
        }
                
        .moments-feed-list { padding: 0 0.75rem; list-style: none; }
        .moment-post { display: flex; gap: 0.625rem; padding: 1.125rem 0; border-bottom: 0.0625rem solid #F0F0F0; }
        .moment-post:last-child { border-bottom: none; }
        .post-author-avatar { width: 2.375rem; height: 2.375rem; border-radius: 0.3125rem; flex-shrink: 0; object-fit: cover; cursor: pointer; }
        .post-details { display: flex; flex-direction: column; gap: 0.4375rem; flex-grow: 1; }
        .post-author-name { font-weight: 600; color: var(--link-color); font-size: 0.9em; }
        .post-content { font-size: 0.9em; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; }
        .post-media { margin-top: 0.25rem; }
        .post-media-image { width: 10rem; height: 10rem; object-fit: cover; border-radius: 0.25rem; }
        .post-media .image-desc-content { background-color: rgba(230,230,230,0.8); width: 10rem; height: 10rem; font-size: 0.9em;}
        .post-meta { display: flex; justify-content: space-between; align-items: center; color: #888; font-size: 0.8em; }
        .post-meta-left { display: flex; align-items: center; gap: 0.5rem; }
        .post-meta-left .private-icon, .post-meta-left .visibility-icon { color: #888; cursor: pointer; }
        .post-actions { display: flex; align-items: center; gap: 0.75rem; }
        .delete-moment-btn { color: var(--link-color); cursor: pointer; font-size: 1em; margin-left: 0.625rem; }
        .post-meta .comment-button, .post-meta .forward-button { background: #F7F7F7; border-radius: 0.1875rem; padding: 0.125rem 0.4375rem; cursor: pointer; font-size: 1.1em; color: var(--link-color); }
        .post-meta .comment-button.disabled, .post-meta .forward-button.disabled { color: #ccc; cursor: not-allowed; }
        .post-interactions { background-color: #F7F7F7; border-radius: 0.25rem; margin-top: 0.5rem; font-size: 0.85em; position: relative; }
        .post-interactions::before { content: ''; position: absolute; top: -0.375rem; left: 0.9375rem; width: 0; height: 0; border-left: 0.375rem solid transparent; border-right: 0.375rem solid transparent; border-bottom: 0.375rem solid #F7F7F7; }
        .likes-section { padding: 0.4375rem 0.625rem;display: flex; align-items: center; gap: 0.4375rem; flex-wrap: wrap; }
        .likes-section .fa-heart { color: var(--link-color); }
        .likes-section .liker-name { font-weight: 500; color: var(--link-color); }
        .comments-section { padding: 0 0.625rem 0.4375rem; list-style: none; border-top: 0.0625rem solid #EAEAEA; }
        .likes-section + .comments-section { margin-top: -0.0625rem;}
        .comments-section li { padding: 0.1875rem 0;}
        .comment-author { font-weight: 500; color: var(--link-color); }

        #wechat-chat-view.delete-mode .wechat-body {
             padding-left: 25px;
             padding-right: 25px;
        }
        #wechat-chat-view.delete-mode .message-row,
        #wechat-chat-view.delete-mode .timestamp-row,
        #wechat-chat-view.delete-mode .event-log-row {
            cursor: pointer;
            position: relative;
        }

        #wechat-chat-view.delete-mode [data-log-index]::before {
            content: '❌';
            position: absolute;
            left: -22px;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            padding: 2px;
            font-size: 12px;
            line-height: 1;
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        #wechat-chat-view.delete-mode .message-row.me[data-log-index]::before {
            left: auto;
            right: -22px;
        }
        
        /* Forwarding Mode Styles */
        .forward-checkbox {
            display: none;
            width: 1.2rem; height: 1.2rem;
            margin-right: 0.5rem;
            align-self: center;
        }
        .message-row.me .forward-checkbox {
             margin-right: 0;
             margin-left: 0.5rem;
        }
        #wechat-chat-view.forward-mode .forward-checkbox {
            display: inline-block;
        }

        #forward-action-bar {
            display: none;
            flex-shrink: 0;
            padding: 0.5rem;
            background-color: #F7F7F7;
            border-top: 1px solid #E2E2E2;
            justify-content: space-around;
            position: relative;
            z-index: 11;
        }
        #wechat-chat-view.forward-mode #forward-action-bar {
            display: flex;
        }

        .forward-action-btn {
            padding: 0.5rem 2rem;
            border: none;
            border-radius: 5px;
            font-size: 1em;
            cursor: pointer;
        }
        #forward-cancel-btn { background-color: #ddd; color: #333; }
        #forward-confirm-btn { background-color: var(--wechat-green-icon); color: white; }

        .forward-bubble .forward-card {
            background-color: #fff;
            border-radius: 0.3125rem;
            overflow: hidden;
            border: 1px solid #e7e7e7;
            cursor: pointer;
        }
        .forward-card .forward-title {
            padding: 0.5rem 0.75rem;
            font-size: 1em;
            font-weight: 500;
            border-bottom: 1px solid #e7e7e7;
        }
        .forward-card .forward-summary {
            padding: 0.5rem 0.75rem;
            font-size: 0.85em;
            color: #888;
        }
        .forward-summary p { margin: 0.2rem 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        #forward-content-modal {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background-color: #F2F2F7;
            z-index: 2500;
            display: none;
            flex-direction: column;
        }
        #forward-content-modal-header {
            flex-shrink: 0; display: flex; justify-content: space-between; align-items: center;
            padding: 0.5rem 0.75rem; background: #F7F7F7; border-bottom: 1px solid #E2E2E2;
            padding-top: 2.8125rem;
        }
        #forward-content-modal-header .title { font-weight: 600; }
        #forward-content-modal-header .close-btn { font-size: 1.2em; cursor: pointer; }
        #forward-content-modal-body {
            flex-grow: 1; overflow-y: auto; padding: 1rem;
        }
        .forward-modal-item {
             margin-bottom: 1rem;
        }
        .forward-modal-item-header {
            display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;
        }
        .forward-modal-item-header img { width: 1.5rem; height: 1.5rem; border-radius: 3px; }
        .forward-modal-item-header .name { font-weight: 500; color: #555; }
        .forward-modal-item-content {
             background-color: #fff; padding: 0.75rem; border-radius: 5px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
             white-space: pre-wrap; word-wrap: break-word;
        }
        #forward-content-modal-body .moment-post {
            border-bottom: none;
            padding: 0;
        }


        .feature-item .sticker-checkbox {
            position: absolute;
            top: 2px;
            right: 2px;
            width: 1rem;
            height: 1rem;
            accent-color: var(--wechat-green-icon);
            cursor: pointer;
        }
        
        #wechat-list-view { background-color: #FFFFFF; }
        .wechat-list-header {
            flex-shrink: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.75rem;
            background: #F7F7F7;
            height: calc(2.8125rem + 1.5rem);
            padding-top: 1.5rem;
            position: relative;
            z-index: 10;
        }
        .wechat-list-header .title { font-weight: 600; font-size: 1.1em; }
        .wechat-list-header .actions .fa-plus { font-size: 1.2em; cursor: pointer; }

        .plus-menu {
            position: absolute;
            top: calc(2.8125rem + 1.5rem);
            right: 0.75rem;
            background-color: #4C4C4C;
            color: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 100;
            overflow: hidden;
            display: none;
        }
        .plus-menu-item {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            cursor: pointer;
            gap: 0.75rem;
            font-size: 0.9em;
        }
        .plus-menu-item:not(:last-child) { border-bottom: 1px solid rgba(255,255,255,0.1); }
        .plus-menu-item:hover { background-color: #383838; }

        .wechat-list-body { flex-grow: 1; overflow-y: auto; }
        .conversation-item {
            display: flex;
            align-items: center;
            padding: 0.625rem 0.75rem;
            cursor: pointer;
            position: relative;
        }
        .conversation-item.pinned { background-color: #F7F7F7; }
        .conversation-item:not(:last-child)::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 4.5rem;
            right: 0;
            height: 1px;
            background-color: #E5E5E5;
        }
        .conversation-item:hover { background-color: #F0F0F0; }
        .convo-avatar-container { position: relative; margin-right: 0.75rem; }
        .convo-avatar { width: 3rem; height: 3rem; border-radius: 0.3125rem; object-fit: cover; background-color: #ddd; }
        .convo-avatar-container .unread-badge { top: -0.3rem; right: -0.3rem; font-size: 0.65em; }
        
        .convo-details { flex-grow: 1; overflow: hidden; }
        .convo-top-line { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem; }
        .convo-name { font-size: 1em; font-weight: 500; color: #191919; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
        .convo-time { font-size: 0.75em; color: #B2B2B2; flex-shrink: 0; }
        .convo-last-message { font-size: 0.85em; color: #999999; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
        .convo-last-message .fa-bell { margin-right: 4px; }


        .main-footer-nav {
            flex-shrink: 0;
            display: flex;
            justify-content: space-around;
            background-color: #F7F7F7;
            border-top: 1px solid #E2E2E2;
            padding: 0.25rem 0;
        }
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #888;
            font-size: 0.7em;
            flex: 1;
            padding: 0.2rem 0;
        }
        .nav-item .nav-icon { font-size: 1.5em; margin-bottom: 0.1rem; }
        .nav-item.active { color: var(--wechat-green-icon); }

        #me-view { background-color: #F2F2F7; }
        .me-body { flex-grow: 1; overflow-y: auto; padding-top: 1.5rem; }
        .me-profile-card { display: flex; align-items: center; gap: 1rem; background-color: #fff; padding: 1.5rem 1rem; cursor: pointer; }
        .me-avatar { width: 4rem; height: 4rem; border-radius: 0.5rem; object-fit: cover; }
        .me-info { flex-grow: 1; }
        .me-name { font-size: 1.2em; font-weight: bold; color: #191919; }
        .me-id { font-size: 0.9em; color: #888; }
        .me-list { margin-top: 1rem; background-color: #fff; }
        .me-list-item { display: flex; align-items: center; gap: 1rem; padding: 0.8rem 1rem; cursor: pointer; border-bottom: 1px solid #F0F0F0; }
        .me-list-item:last-child { border-bottom: none; }
        .me-list-item .item-icon { font-size: 1.2em; color: #333; width: 1.5em; text-align: center; }
        .me-list-item .item-label { flex-grow: 1; font-size: 1em; color: #191919; }
        .me-list-item .item-value { color: #888; }
        .me-list-item .fas.fa-chevron-right { color: #C7C7CC; }
        
        #contact-details-view { background-color: #F2F2F7; }
        .contact-profile-card { display: flex; align-items: flex-start; gap: 1rem; background-color: #fff; padding: 1.5rem 1rem; margin-bottom: 1rem;}
        .contact-avatar { width: 4rem; height: 4rem; border-radius: 0.5rem; object-fit: cover; cursor: pointer; }
        .contact-info .contact-name-large { font-size: 1.2em; font-weight: bold; color: #191919; }
        .contact-info .contact-id { font-size: 0.9em; color: #888; }
        .contact-action-list .me-list-item { justify-content: center; }
        .contact-action-list .item-label { flex-grow: 0; text-align: center; }
        .contact-action-list .item-label.danger { color: #E64340; }

        .context-menu-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0); z-index: 1000; }
        .context-menu {
            position: absolute;
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            padding: 5px 0;
            z-index: 1001;
            min-width: 120px;
        }
        .context-menu-item {
            padding: 10px 15px;
            cursor: pointer;
            font-size: 0.9em;
        }
        .context-menu-item:hover { background-color: #f0f0f0; }

        #group-chat-modal, #group-owner-modal {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 2000;
            display: none;
            justify-content: center;
            align-items: center;
        }
        .group-chat-modal-content {
            background: #F7F7F7;
            width: 90%;
            max-width: 340px;
            border-radius: 0.75rem;
            display: flex;
            flex-direction: column;
            max-height: 80%;
        }
        .group-chat-modal-header {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #E2E2E2;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .group-chat-modal-header .title { font-weight: 600; }
        .group-chat-modal-header .cancel-btn { cursor: pointer; }
        .group-chat-contact-list {
            padding: 0.5rem 1rem;
            overflow-y: auto;
            flex-grow: 1;
        }
        .group-chat-contact-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 0;
        }
        .group-chat-contact-item input[type="checkbox"],
        .group-owner-item input[type="radio"] {
            width: 1.2rem;
            height: 1.2rem;
            accent-color: var(--wechat-green-icon);
        }
        .group-chat-contact-item img,
        .group-owner-item img {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 0.25rem;
        }
        .group-owner-item {
            display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0;
        }
        .group-chat-modal-footer {
            padding: 1rem;
            border-top: 1px solid #E2E2E2;
        }
        .group-chat-modal-footer input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 0.25rem;
            margin-bottom: 1rem;
            box-sizing: border-box;
        }
        .group-chat-modal-footer button {
            width: 100%;
            padding: 0.6rem;
            border: none;
            background: var(--wechat-green-icon);
            color: white;
            font-size: 1em;
            border-radius: 0.25rem;
            cursor: pointer;
        }
        
        #group-settings-view { background-color: #F2F2F7; }
        .group-settings-body {
            flex-grow: 1;
            overflow-y: auto;
            padding: 1rem;
            box-sizing: border-box; /* [FIX] Prevent padding from breaking layout */
        }
        .group-member-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr));
            gap: 1rem;
            padding: 1rem;
            background-color: #fff;
            border-radius: 0.5rem;
        }
        .group-member-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8em;
            color: #888;
            cursor: pointer;
            text-align: center;
        }
        .group-member-item img {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 0.3rem;
            object-fit: cover;
        }
        .group-member-item .member-name-role {
            display: block;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .group-member-item .member-role {
            font-size: 0.9em;
            color: #b2b2b2;
        }

        .add-member-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 3.5rem;
            height: 3.5rem;
            border: 1px dashed #ccc;
            border-radius: 0.3rem;
            cursor: pointer;
            font-size: 1.5rem;
            color: #ccc;
        }
        .tutorial-container {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            line-height: 1.7;
            color: #e6edf3;
            background-color: #0d1117;
            padding: 20px;
            margin-top: -1.25rem; /* Only override top margin */
            margin-left: -1.25rem;
            margin-right: -1.25rem;
            border-radius: 0.75rem;
        }

        .tutorial-container .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px 40px;
            background-color: #161b22;
            border: 1px solid #30363d;
            border-radius: 8px;
        }

        .tutorial-container h1,
        .tutorial-container h2,
        .tutorial-container h3,
        .tutorial-container h4 {
            color: #58a6ff;
            border-bottom: 1px solid #30363d;
            padding-bottom: 8px;
        }

        .tutorial-container h1 {
            font-size: 2em;
            text-align: center;
        }

        .tutorial-container h2 {
            font-size: 1.6em;
            margin-top: 40px;
        }

        .tutorial-container h3 {
            font-size: 1.3em;
            margin-top: 30px;
            border-bottom-style: dashed;
        }

        .tutorial-container h4 {
            font-size: 1.15em;
            color: #79c0ff;
            border-bottom: none;
            margin-top: 25px;
        }

        .tutorial-container a {
            color: #58a6ff;
            text-decoration: none;
        }

        .tutorial-container a:hover {
            text-decoration: underline;
        }

        .tutorial-container ul,
        .tutorial-container ol {
            padding-left: 25px;
        }

        .tutorial-container li {
            margin-bottom: 12px;
        }

        .tutorial-container strong {
            color: #ffb17a;
            font-weight: 600;
        }

        .tutorial-container code {
            background-color: rgba(175, 184, 193, 0.2);
            border-radius: 4px;
            padding: 3px 6px;
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            font-size: 0.9em;
        }

        .tutorial-container .toc {
            background-color: #0d1117;
            border: 1px solid #30363d;
            padding: 15px 25px;
            border-radius: 6px;
            margin-bottom: 40px;
        }

        .tutorial-container .toc h3 {
            text-align: center;
            border-bottom: none;
            margin-top: 5px;
        }

        .tutorial-container .toc ul {
            padding-left: 0;
            list-style: none;
            columns: 2;
            -webkit-columns: 2;
            -moz-columns: 2;
        }

        .tutorial-container .toc ul li {
            font-weight: bold;
            margin-bottom: 10px;
        }

        .tutorial-container .note {
            background-color: rgba(45, 126, 199, 0.1);
            border-left: 4px solid #58a6ff;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 4px 4px 0;
        }

        .tutorial-container .license-box {
            background-color: #2c1d1d;
            border: 1px solid #8B0000;
            color: #f0c6c6;
            padding: 10px 25px;
            margin: 20px 0 40px 0;
            border-radius: 8px;
        }

        .tutorial-container .license-box h3,
        .tutorial-container .license-box h4 {
            color: #ff7b72;
            text-align: center;
            border-bottom-color: #8B0000;
        }

        .tutorial-container .license-box ul,
        .tutorial-container .license-box ol {
            padding-left: 20px;
        }

        .tutorial-container .license-box blockquote {
            background-color: rgba(255, 255, 255, 0.05);
            border-left: 4px solid #ff7b72;
            margin: 10px 0;
            padding: 10px 15px;
            font-style: italic;
        }

        .tutorial-container blockquote {
            background-color: rgba(255, 215, 0, 0.1);
            border-left: 4px solid #ffd700;
            margin: 10px 0;
            padding: 10px 15px;
            font-style: italic;
        }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

class BLMX_Protocol {
    constructor(tavernHelperBridge, charId) {
        this.logEntries = []; 
        this.messageId = null;
        this.charId = charId;
        this.LOG_START_TAG = "===BLMX_LOG_BEGIN===";
        this.LOG_END_TAG = "===BLMX_LOG_END===";
        this.bridge = tavernHelperBridge;
    }

    async initialize() {
        console.log("[BLMX] Initializing and scanning for chat history...");
        const lastMessageId = await this.bridge.getLastMessageId();

        if (lastMessageId === null) {
            console.warn("[BLMX] No messages found. Starting fresh at message ID 0.");
            this.messageId = 0;
            this.logEntries = [];
            await this.persistLogToStorage();
            return true;
        }

        let latestUiMessage = null;
        const previousUiMessages = [];

        for (let i = lastMessageId; i >= 0; i--) {
            try {
                const msg = (await this.bridge.getChatMessages(i))[0];
                if (msg && msg.message && msg.message.includes(this.LOG_START_TAG)) {
                    if (!latestUiMessage) {
                        latestUiMessage = { id: i, content: msg.message };
                    } else {
                        previousUiMessages.push({ id: i, content: msg.message });
                    }
                }
            } catch (error) {
            }
        }

        if (!latestUiMessage) {
            console.log("[BLMX] No UI log found. Creating a new one in the latest message.");
            this.messageId = lastMessageId;
            this.logEntries = [];
            await this.persistLogToStorage();
            return true;
        }

        console.log(`[BLMX] Found latest UI log in message ${latestUiMessage.id}. Consolidating...`);
        this.messageId = latestUiMessage.id;
        let consolidatedLogParts = [];

        const latestLogStartIndex = latestUiMessage.content.indexOf(this.LOG_START_TAG);
        const latestLogEndIndex = latestUiMessage.content.indexOf(this.LOG_END_TAG);
        if (latestLogStartIndex !== -1 && latestLogEndIndex !== -1) {
            const logPart = latestUiMessage.content.slice(latestLogStartIndex + this.LOG_START_TAG.length, latestLogEndIndex).trim();
            if(logPart) consolidatedLogParts.push(logPart);
        }

        for (const prevMsg of previousUiMessages) {
            const prevLogStartIndex = prevMsg.content.indexOf(this.LOG_START_TAG);
            const prevLogEndIndex = prevMsg.content.indexOf(this.LOG_END_TAG);
            if (prevLogStartIndex !== -1 && prevLogEndIndex !== -1) {
                const logPart = prevMsg.content.slice(prevLogStartIndex + this.LOG_START_TAG.length, prevLogEndIndex).trim();
                if(logPart) consolidatedLogParts.unshift(logPart);

                const cleanedContent = prevMsg.content.substring(0, prevLogStartIndex) + prevMsg.content.substring(prevLogEndIndex + this.LOG_END_TAG.length);
                await this.bridge.setChatMessage(cleanedContent.trim(), prevMsg.id, { refresh: "none" });
                console.log(`[BLMX] Cleaned and moved UI log from message ${prevMsg.id}.`);
            }
        }

        const finalLogString = consolidatedLogParts.join('\n');
        this._parseLogFromString(finalLogString);

        await this.persistLogToStorage();
        console.log(`[BLMX] Consolidated log saved to message ${this.messageId}.`);
        
        return true;
    }

    _formatEntryForStorage(entry) {
        if(entry.key === 'RECALL_MESSAGE') {
             return `RECALL_MESSAGE:${JSON.stringify(entry.data)}`;
        }
        if (entry.key) { // System events like MOMENT, LIKE, etc.
            return `${entry.key}:${JSON.stringify(entry.data)}`;
        }
        if (entry.type === 'event_log' || entry.type === 'group_event' || entry.type === 'time') {
            const key = entry.type.toUpperCase();
            return `${key}:${JSON.stringify(entry.content)}`;
        }

        const convoId = entry.conversationId || entry.convoId;
        if (!convoId || !entry.sender) {
            console.warn("[BLMX] Cannot format entry for storage, missing convoId or sender:", entry);
            return null;
        }

        let contentStr;
        switch(entry.type) {
            case 'message':
                contentStr = entry.content;
                break;
            case 'sticker':
                contentStr = `[sticker: ${entry.content}]`;
                break;
            case 'image':
                contentStr = `[image: ${JSON.stringify(entry.content)}]`;
                break;
            case 'voice':
                contentStr = `[voice: ${JSON.stringify(entry.content)}]`;
                break;
            case 'location':
                contentStr = `[location: ${entry.content}]`;
                break;
            case 'transfer':
                contentStr = `[transfer: ${JSON.stringify(entry.data)}]`;
                break;
            case 'file':
                contentStr = `[file: ${entry.content}]`;
                break;
            case 'gift':
                contentStr = `[gift: ${JSON.stringify(entry.data)}]`;
                break;
            case 'red_packet':
                contentStr = `[red_packet: ${JSON.stringify(entry.content)}]`;
                break;
            case 'forward':
                contentStr = `[forward: ${JSON.stringify({ title: entry.data.title, messageIds: entry.data.messageIds })}]`;
                break;
            default:
                console.warn("[BLMX] Unknown entry type for storage formatting:", entry.type);
                return null;
        }

        return `[${convoId}] ${entry.sender}: ${contentStr}`;
    }

    async persistLogToStorage() {
        if (this.messageId === null) {
             console.warn("[BLMX] Cannot save log, message_id not initialized.");
             return;
        }
        try {
            this.logEntries.forEach((e, index) => e.id = `msg_${index}`); 

            const logString = this.logEntries
                                .map(e => this._formatEntryForStorage(e))
                                .filter(Boolean)
                                .join('\n');


            const existingMessage = (await this.bridge.getChatMessages(this.messageId))[0];
            let existingContent = existingMessage ? existingMessage.message : '';
            
            const logStartIndex = existingContent.indexOf(this.LOG_START_TAG);
            const logEndIndex = existingContent.indexOf(this.LOG_END_TAG);

            const newLogBlock = `${this.LOG_START_TAG}\n${logString}\n${this.LOG_END_TAG}`;
            let fullText;

            if (logStartIndex !== -1 && logEndIndex !== -1) {
                fullText = existingContent.substring(0, logStartIndex) + newLogBlock + existingContent.substring(logEndIndex + this.LOG_END_TAG.length);
            } else {
                fullText = existingContent + '\n' + newLogBlock;
            }
            
            await this.bridge.setChatMessage(fullText.trim(), this.messageId, { refresh: "none" });
        } catch (error) { console.error("[BLMX] Failed to save narrative log to text box:", error); }
    }
    
    _parseLogFromString(logString) {
        this.logEntries = [];
        const lines = logString.split('\n').filter(line => line.trim() !== '');
        const chatRegex = /^\[([^\]]+)\]\s+([^:]+):\s+(.*)$/;
        const recallRegex = /^RECALL_MESSAGE:(.*)$/;

        const recallsToProcess = [];

        lines.forEach((line, index) => {
            try {
                const recallMatch = line.match(recallRegex);
                if (recallMatch) {
                    const recallData = JSON.parse(recallMatch[1]);
                    this.logEntries.push({ id: `msg_${index}`, key: 'RECALL_MESSAGE', data: recallData });
                    return; 
                }
                
                let entry = { id: `msg_${index}` };
                const chatMatch = line.match(chatRegex);

                if (chatMatch) {
                    const convoId = chatMatch[1];
                    const senderId = chatMatch[2];
                    const contentPart = chatMatch[3];

                    Object.assign(entry, { sender: senderId, conversationId: convoId, convoId: convoId });

                    const stickerMatch = contentPart.match(/^\[sticker:\s*(.+)\]$/);
                    const imageMatch = contentPart.match(/^\[image:\s*(.+)\]$/);
                    const voiceMatch = contentPart.match(/^\[voice:\s*(.+)\]$/);
                    const locationMatch = contentPart.match(/^\[location:\s*(.+)\]$/);
                    const transferMatch = contentPart.match(/^\[transfer:\s*(.+)\]$/);
                    const fileMatch = contentPart.match(/^\[file:\s*(.+)\]$/);
                    const giftMatch = contentPart.match(/^\[gift:\s*(.+)\]$/);
                    const redPacketMatch = contentPart.match(/^\[red_packet:\s*(.+)\]$/);
                    const forwardMatch = contentPart.match(/^\[forward:\s*(.+)\]$/);

                    if (stickerMatch) { entry.type = 'sticker'; entry.content = stickerMatch[1]; } 
                    else if (imageMatch) { entry.type = 'image'; entry.content = JSON.parse(imageMatch[1]); }
                    else if (voiceMatch) { entry.type = 'voice'; entry.content = JSON.parse(voiceMatch[1]); }
                    else if (locationMatch) { entry.type = 'location'; entry.content = locationMatch[1]; }
                    else if (transferMatch) { entry.type = 'transfer'; entry.data = JSON.parse(transferMatch[1]); entry.content = transferMatch[1]; }
                    else if (fileMatch) { entry.type = 'file'; entry.content = fileMatch[1]; }
                    else if (giftMatch) { entry.type = 'gift'; entry.data = JSON.parse(giftMatch[1]); entry.content = giftMatch[1]; }
                    else if (redPacketMatch) { entry.type = 'red_packet'; entry.content = JSON.parse(redPacketMatch[1]); }
                    else if (forwardMatch) { 
                        entry.type = 'forward'; 
                        entry.data = JSON.parse(forwardMatch[1]);
                    }
                    else { entry.type = 'message'; entry.content = contentPart; }
                    
                } else {
                    const firstColonIndex = line.indexOf(':');
                    if (firstColonIndex === -1) return;

                    const key = line.substring(0, firstColonIndex).trim();
                    const value = line.substring(firstColonIndex + 1).trim();
                    const systemCommands = ['EVENT_LOG', 'TIME', 'MOMENT', 'CHAR_COMMENT', 'CHAR_LIKE', 'SIGNATURE_UPDATE', 'GROUP_EVENT', 'CREATE_GROUP', 'KICK_MEMBER', 'MUTE_MEMBER', 'SET_ADMIN', 'CHANGE_NICKNAME', 'LEAVE_GROUP'];

                    if (systemCommands.includes(key)) {
                        if (!value) return;
                        const data = JSON.parse(value);
                        if (['TIME', 'EVENT_LOG', 'GROUP_EVENT'].includes(key)) {
                            Object.assign(entry, { type: key.toLowerCase(), content: data });
                        } else {
                            Object.assign(entry, { key, data });
                        }
                    } else {
                         return; // Skip unknown lines
                    }
                }
                 this.logEntries.push(entry);
            } catch(e) { console.error("[BLMX] Failed to parse log line:", line, e); }
        });
    }

    getContextForAI(activeConvoIds, contacts, conversations, isGlobalMode, isObserverPoke, activeStickers) {
        let systemNote = `[最高优先级：身份与对话核心逻辑]
1.  **你的身份与禁令:** 用户的唯一ID是 \`{{user}}\`。角色名（如“夏夏”）只是其昵称。你必须将 \`{{user}}\` 和其昵称视为同一个人。你的任务是扮演这个虚拟手机世界中 **除 {{user}} 以外的所有角色**。你 **绝对禁止** 以任何形式代替或模拟 `{{user}}` 进行任何操作。这包括：
    *   **禁止撰写 `{{user}}` 的消息:** 绝对不能输出任何以 \`{{user}}:\` 开头的对话。
    *   **禁止杜撰 `{{user}}` 的行为:** 绝对不能在 \`EVENT_LOG\` 或任何系统消息中描述 `{{user}}` 的行为或想法。例如，严禁编写 \`EVENT_LOG:{"description":"{{user}}叫大家起床"}\` 这样的内容。
    `{{user}}` 的所有输入都来自于真实的人类用户，你的唯一工作就是让其他角色对此做出反应。
2.  **私聊规则:** 当角色A想和 \`{{user}}\` 说话时，**必须**使用已存在的1对1私聊。**绝对禁止**为此创建一个只包含角色A和 \`{{user}}\` 的新群聊。
3.  **群聊规则:** 群聊是为 **三个或更多** 参与者准备的。唯一的例外是两个 **非{{user}}** 角色之间可以创建二人群聊进行私密对话。

[核心扮演准则]
1.  **角色自主性:** 你的核心任务是让这个虚拟世界感觉是“活的”。角色拥有自己的生活、思想和社交圈，他们的所有行为都应由其性格和当前剧情逻辑驱动。**你必须主动，不要只等待{{user}}发起对话。** 这包括主动发起私聊/群聊、发朋友圈、评论/点赞、更新签名等。
2.  **线上聊天:** 所有回复都必须是手机上的对话内容。严禁任何形式的动作、神态、心理、环境等旁白描写。
3.  **消息分离:** 任何非纯文本内容（如表情、图片、转账等）都**必须作为一条单独的消息发送**，不得与文本内容合并。
4.  **多样化行为:** 角色应避免重复单一的行为，例如不要连续发送同一个表情包，尝试在对话中表现出更多样的反应。

[核心交互指令]
*注意：所有指令中的时间戳格式必须为 \`YYYY-MM-DDTHH:mm\`*

1.  **[时间与叙事]**
    *   \`EVENT_LOG:{"convoId": "目标对话ID", "timestamp":"YYYY-MM-DDTHH:mm", "description":"可选，简述此期间发生的事件。"}\`

2.  **[角色通用行为]**
    *   \`SIGNATURE_UPDATE:{"author":"角色ID","signature":"新的个性签名"}\`
    *   \`RECALL_MESSAGE:{"author":"角色ID","target_text":"要撤回的完整消息文本"}\`

3.  **[发送丰富消息]** (格式: \`角色ID:内容\`)
    *   \`角色ID:[语音:{"text":"语音转写的文字","duration":整数秒数}]\`
    *   \`角色ID:[图片:{"type":"desc","value":"对图片的详细描述"}]\`
    *   \`角色ID:[位置:具体的地点名称]\`
    *   \`角色ID:[文件:文件名.后缀]\`
    *   \`角色ID:[表情:表情名称]\` (**CRITICAL:** 仅当系统在下方\`[System Note]\`中为该角色提供了可用表情包列表时，才能使用此指令。如果列表为空或未提供，则该角色**不能**发送表情。**严禁捏造不存在的表情包。**)
    *   \`角色ID:[forward:{"title":"转发的标题","messageIds":["消息ID_1", "moment_ID_1"]}]\` (转发消息或朋友圈)

4.  **[转账与礼物]** (格式: \`角色ID:内容\`)
    *   \`角色ID:[转账:{"amount":金额,"note":"备注","recipientId":"接收方ID(群聊必须)","status":"sent"}]\`
    *   \`角色ID:[礼物:{"name":"礼物名","price":"价格(可选)","recipientId":"接收方ID(群聊必须)","status":"sent"}]\`
    *   **回应\`{{user}}\` (必须回应):** \`status\` 改为 \`accepted\` (接收) 或 \`rejected\` (拒收)。

5.  **[群聊管理指令]**
    *   \`CREATE_GROUP:{"name":"群聊名称","owner":"创建者角色ID","members":["角色ID_1"],"include_user":布尔值}\`
    *   \`KICK_MEMBER:{"author":"操作者ID","convoId":"群聊ID","targetId":"被踢者ID"}\`
    *   \`LEAVE_GROUP:{"author":"要退群的角色ID","convoId":"群聊ID"}\`
    *   **重要:** 严禁使用EVENT_LOG伪造群管理提示。必须使用正确的管理指令。

6.  **[朋友圈系统指令]**
    *   \`MOMENT:{"author":"角色ID","text":"朋友圈文字内容","timestamp":"YYYY-MM-DDTHH:mm","image_type":"desc","image":"图片描述(可选)","isPrivate":布尔值,"visibleTo":["角色ID"],"invisibleTo":["角色ID"]}\`
        *   **私密朋友圈 (isPrivate:true):** 当 \`"isPrivate":true\` 时，代表角色发布了一条 **仅自己可见** 的朋友圈。这条动态 **无法被任何其他角色（包括{{user}}）看到**，也不会触发点赞或评论。角色可以在这里记录不想公开的内心独白或秘密。
        *   **逻辑互斥 (CRITICAL LOGIC):** **`isPrivate` 与 `visibleTo`/`invisibleTo` 绝对互斥。**
            *   如果一条朋友圈是私密的 (`isPrivate:true`)，那么 `visibleTo` 和 `invisibleTo` 两个字段 **必须为空数组 `[]` 或不存在**。
            *   反之，如果角色想发给特定人看（例如，仅 `{{user}}` 可见），那么 **必须使用 `visibleTo` 字段**，并且 `isPrivate` **必须为 `false`**。
    *   \`CHAR_COMMENT:{"author":"评论者ID","text":"评论内容","target_post_id":帖子的数字ID}\` (注意: 帖子的ID从0开始计数！)
    *   \`CHAR_LIKE:{"author":"点赞者ID","target_post_id":帖子的数字ID}\` (注意: 帖子的ID从0开始计数！)

7.  **[红包与事件]**
    *   红包被发出后，系统会自动通过\`GROUP_EVENT\`消息模拟领取过程。你应将这些事件视为红包已被处理，**严禁**再使用\`EVENT_LOG\`或其他方式重复模拟领取动作。
`;
        
        let contextLines = [systemNote];
        let infoBlock = `\n[System Note: You are roleplaying. The user's ID is '{{user}}'.`;

        if (Object.keys(activeStickers).length > 0) {
            infoBlock += ' Available character/group stickers: '
            let stickerInfoParts = [];
            for (const actorId in activeStickers) {
                if (activeStickers[actorId].length > 0) {
                    const stickerLabels = activeStickers[actorId].map(s => s.label).join(', ');
                    stickerInfoParts.push(`${actorId} can use (${stickerLabels})`);
                }
            }
            infoBlock += stickerInfoParts.join('; ') + '.';
        }

        if (isGlobalMode) {
            infoBlock += ` You MUST account for ALL conversations listed below that have new messages from '{{user}}'. Reply directly or use EVENT_LOG to explain their status. CRITICAL: ALL direct replies MUST be prefixed with the conversation ID, e.g., '[convo_id] speaker_id: message'.\n\nActive Conversations:\n`;

            activeConvoIds.forEach(convoId => {
                const convo = conversations.find(c => c.id === convoId);
                if (convo) {
                    const participants = convo.members.map(id => (id === 'user') ? '{{user}}' : (contacts.find(c => c.id === id)?.id || 'Unknown')).join(', ');
                    infoBlock += `- ID: [${convo.id}], Type: ${convo.type === 'group' ? `Group Chat "${convo.name}"` : 'Private Chat'}, Participants: ${participants}\n`;
                }
            });
            contextLines.push(infoBlock + ']\n');

            activeConvoIds.forEach(convoId => {
                contextLines.push(`--- Conversation History for [${convoId}] ---`);
                const convoHistory = this.logEntries
                    .filter(entry => {
                        const entryConvoId = entry.conversationId || (entry.content && entry.content.convoId) || (entry.data && entry.data.convoId);
                        return entryConvoId === convoId;
                    })
                    .map(entry => this._formatEntryForAI(entry, convoId, activeConvoIds))
                    .filter(Boolean);
                contextLines.push(...convoHistory);
                contextLines.push('--- End of History ---\n');
            });

        } else { // Local Mode
            const convoId = activeConvoIds[0];
            const convo = conversations.find(c => c.id === convoId);
            if (!convo) return "";

            const participants = convo.members.map(id => (id === 'user') ? '{{user}}' : (contacts.find(c => c.id === id)?.id || 'Unknown')).join(', ');
            
            if (isObserverPoke) {
                 infoBlock += ` You are roleplaying members of the group chat "${convo.name}". Participants: ${participants}. The user is observing. Based on the history, generate a natural continuation of the conversation. The group was created by the owner, ${convo.owner}. Prefix each line of dialogue with the speaker's exact ID, e.g., "角色A: Hello."]\n\n`;
            } else {
                 infoBlock += ` You are roleplaying in a single chat. The conversation is a ${convo.type === 'group' ? `group chat named "${convo.name}"` : `private chat`}. Participants: ${participants}. Respond as one of the characters (excluding '{{user}}'). Prefix each line with the speaker's ID, e.g., "角色A: Hello."]\n\n`;
            }
            contextLines.push(infoBlock);
            
            const convoHistory = this.logEntries
                .filter(entry => {
                    const entryConvoId = entry.conversationId || (entry.content && entry.content.convoId) || (entry.data && entry.data.convoId);
                    return entryConvoId === convoId;
                })
                .map(entry => this._formatEntryForAI(entry, convoId, activeConvoIds))
                .filter(Boolean);
            contextLines.push(...convoHistory);
        }
        
        const momentsForAI = this.logEntries
            .filter(e => e.key === 'MOMENT' && !e.data.isPrivate)
            .map(e => `[MOMENT by ${e.data.author} at ${e.data.timestamp}: "${e.data.text || '(no text)'}"]`)
            .join('\n');
        if (momentsForAI) {
            contextLines.push('\n--- Recent Public Moments ---\n' + momentsForAI);
        }


        return contextLines.join('\n');
    }
    
    _formatEntryForAI(entry, currentConvoId, activeConvoIds) {
        if (entry.key === 'RECALL_MESSAGE') return `[${entry.data.author} recalled a message]`;
        
        if(entry.type === 'forward') {
            const isTargetedConvo = activeConvoIds.includes(currentConvoId);
            let expandedContent = `[${entry.sender} forwarded content titled "${entry.data.title}":\n`;

            if (isTargetedConvo && entry.data.messageIds) {
                 entry.data.messageIds.forEach(msgId => {
                    if (msgId.startsWith('moment_')) {
                        const momentIndex = parseInt(msgId.replace('moment_', ''), 10);
                        const allMoments = this.logEntries.map((e, i) => ({...e, originalIndex: i})).filter(e => e.key === 'MOMENT');
                        const originalMoment = allMoments.find(m => m.originalIndex === momentIndex);
                        if (originalMoment) {
                            let momentText = `  [Forwarded Moment by ${originalMoment.data.author}: ${originalMoment.data.text || ""}`;
                            if (originalMoment.data.image) momentText += ` (includes an image)`;
                            
                            const interactions = this.logEntries.filter(e => (e.key === 'CHAR_LIKE' || e.key === 'CHAR_COMMENT') && parseInt(e.data.target_post_id, 10) === allMoments.findIndex(m => m.originalIndex === momentIndex));
                            if (interactions.length > 0) momentText += ` (${interactions.length} interactions)`;
                            
                            momentText += `]\n`;
                            expandedContent += momentText;
                        }
                    } else {
                        const originalMsg = this.logEntries.find(e => e.id === msgId);
                        if (originalMsg) {
                            expandedContent += `  ${this._formatEntryForAI(originalMsg, currentConvoId, activeConvoIds)}\n`;
                        }
                    }
                 });
                expandedContent += ']';
                return expandedContent;
            } else {
                 return `${entry.sender}: [转发的内容: ${entry.data.title}]`;
            }
        }

        if (entry.key === 'MOMENT') {
            return null;
        }
        
        if (entry.type === 'event_log' || entry.type === 'group_event') {
            const key = entry.type.toUpperCase();
            const desc = entry.content.description || this.getGroupEventDescription(entry.content);
            const convoId = entry.content.convoId || entry.content.conversationId;
            return `[${key} in convo ${convoId} at ${entry.content.timestamp || ''}: ${desc}]`;
        }
        
        if (entry.type && !['time', 'like', 'comment', 'signature_update'].includes(entry.type)) {
            const prefix = entry.sender;
            let content;
            switch(entry.type) {
                case 'message': content = entry.content; break;
                case 'sticker': content = `[表情: ${entry.content}]`; break;
                case 'voice': content = `[语音: ${JSON.stringify(entry.content)}]`; break;
                case 'image':
                    if (entry.content && typeof entry.content === 'object') {
                        content = `[图片: ${JSON.stringify({ type: 'desc', value: entry.content.value })}]`;
                    } else {
                        content = `[图片: ${entry.content}]`;
                    }
                    break;
                case 'location': content = `[位置: ${entry.content}]`; break;
                case 'file': content = `[文件: ${entry.content}]`; break;
                case 'red_packet': content = `[红包: ${JSON.stringify(entry.content)}]`; break;
                case 'gift': content = `[礼物: ${JSON.stringify(entry.data)}]`; break;
                case 'transfer': content = `[转账: ${JSON.stringify(entry.data)}]`; break;
                default: return null;
            }
            return `${prefix}: ${content}`;
        }
        return null;
    }

    getGroupEventDescription(eventData) {
        return eventData.type;
    }
    
    addEntry(entry) { this.logEntries.push(entry); }
}


    const Views = {
        home: document.getElementById('app-homescreen'),
        wechatList: document.getElementById('wechat-list-view'),
        wechatChat: document.getElementById('wechat-chat-view'),
        me: document.getElementById('me-view'),
        contactDetails: document.getElementById('contact-details-view'),
        groupSettings: document.getElementById('group-settings-view'),
        moments: document.getElementById('moments-view'),
        settings: document.getElementById('settings-view'),
    };
    const wechatBody = document.querySelector('#wechat-chat-view .wechat-body');
    const wechatInput = document.getElementById('wechat-input-field');
    const sendBtn = document.getElementById('send-btn');
    const plusBtn = document.getElementById('plus-btn');
    const stickerGrid = document.getElementById('sticker-grid');
    const charStickerGrid = document.getElementById('char-sticker-grid');
    const plusPanel = document.getElementById('plus-panel');
    const momentsFeedList = document.getElementById('moments-feed-list');
    
    let isGenerating = false, tavernGenerateFunc = null, blmxManager = null;
    let userMessageQueue = [];
    let hasPendingNotifications = false;
    let drafts = {};
    
    let currentCharId = ''; 
    let currentConversationId = null; 
    let currentMomentsAuthorId = null;
    
    let contacts = []; 
    let conversations = []; 
    let userProfile = { id: 'user', name: '{{user}}', avatar: '', signature: '' };


    const GLOBAL_STICKER_STORAGE_KEY = "blmx_wechat_stickers_global";
    const defaultGlobalStickers = [{label:"好的",url:"https://files.catbox.moe/3j0tpc.jpeg"}];
    
    const CHAR_STICKER_STORAGE_KEY_PREFIX = "blmx_char_stickers_";
    const getCharStickerStorageKey = (id) => `${CHAR_STICKER_STORAGE_KEY_PREFIX}${currentCharId}_${id}`;
    
    const WALLPAPER_KEYS = {
        chat: 'blmx_wallpaper_chat_url',
        home: 'blmx_wallpaper_home_url',
        settings: 'blmx_wallpaper_settings_url'
    };
    
    function saveData() {
        localStorage.setItem(`blmx_contacts_${currentCharId}`, JSON.stringify(contacts));
        localStorage.setItem(`blmx_conversations_${currentCharId}`, JSON.stringify(conversations));
        localStorage.setItem(`blmx_user_profile_${currentCharId}`, JSON.stringify(userProfile));
    }
    
    function loadData() {
        contacts = JSON.parse(localStorage.getItem(`blmx_contacts_${currentCharId}`) || '[]');
        conversations = JSON.parse(localStorage.getItem(`blmx_conversations_${currentCharId}`) || '[]');
        userProfile = JSON.parse(localStorage.getItem(`blmx_user_profile_${currentCharId}`) || '{"id":"user", "name":"{{user}}", "avatar":"", "signature":""}');
    }

    function getDisplayName(id, convoId) {
        if (id === 'user' || id === '{{user}}') {
            if (convoId) {
                const convo = conversations.find(c => c.id === convoId);
                if (convo && convo.type === 'group' && convo.nicknames && (convo.nicknames['user'] || convo.nicknames['{{user}}'])) {
                    return convo.nicknames['user'] || convo.nicknames['{{user}}'];
                }
            }
            return userProfile.name;
        }

        const contact = contacts.find(c => c.id === id);
        if(!contact) return id;

        if (convoId) {
            const convo = conversations.find(c => c.id === convoId);
            if (convo && convo.type === 'group' && convo.nicknames && convo.nicknames[id]) {
                return convo.nicknames[id];
            }
        }
        
        return contact.remark || contact.name;
    }
    
    function getAvatar(id) {
        if (id === 'user' || id === '{{user}}') {
            return userProfile.avatar || 'https://files.catbox.moe/bialj8.jpeg';
        }
        const contact = contacts.find(c => c.id === id);
        return (contact && contact.avatar) ? contact.avatar : 'https://files.catbox.moe/bialj8.jpeg';
    }

    function navigateTo(viewName, options = {}) {
        if (currentConversationId && document.getElementById('wechat-chat-view').classList.contains('active')) {
            drafts[currentConversationId] = wechatInput.value;
        }

        Object.values(Views).forEach(v => v.classList.remove('active'));
        if (Views[viewName]) {
             Views[viewName].classList.add('active');
        }
        
        if (viewName === 'wechatChat') {
            currentConversationId = options.conversationId;
            const conversation = conversations.find(c => c.id === currentConversationId);
            if (conversation) {
                const inputArea = document.querySelector('.wechat-input-area');
                const observerFooter = document.getElementById('observer-mode-footer');
                const forwardBar = document.getElementById('forward-action-bar');

                if (conversation.userIsObserver) {
                    inputArea.classList.add('disabled');
                    observerFooter.classList.remove('disabled');
                } else {
                    inputArea.classList.remove('disabled');
                    observerFooter.classList.add('disabled');
                    checkAndApplyMuteState();
                }

                forwardBar.style.display = 'none';
                document.getElementById('wechat-chat-view').classList.remove('forward-mode');

                if(conversation.id === 'moments_feed') {
                    conversation.unread = 0;
                    navigateTo('moments');
                    return;
                }
                conversation.unread = 0;
                saveData();
                renderConversationList(); 
                updateAppBadge();
                
                applyCurrentChatWallpaper();
                renderChatHistory(currentConversationId);
                
                const header = document.getElementById('contact-name-header');
                if (conversation.type === 'group') {
                    header.textContent = `${conversation.name} (${conversation.members.length})`;
                     if (conversation.dissolved) {
                         header.textContent += " (已解散)";
                     }
                } else {
                    const otherMemberId = conversation.members.find(m => m !== 'user');
                    header.textContent = getDisplayName(otherMemberId, conversation.id);
                }
                wechatInput.value = drafts[currentConversationId] || '';
                updateFooterButtonsState();
            }
        } else if (viewName === 'wechatList') {
            currentConversationId = null;
            renderConversationList();
        } else if (viewName === 'me') {
            document.getElementById('me-view-avatar').src = getAvatar('user');
            document.getElementById('me-view-name').textContent = getDisplayName('user', null);
            document.getElementById('me-view-id').textContent = `ID: {{user}}`;
        } else if (viewName === 'moments') {
            currentMomentsAuthorId = options.authorId || null; 
            document.getElementById('post-moment-btn').style.display = (currentMomentsAuthorId && currentMomentsAuthorId !== 'user') ? 'none' : 'block';
            renderMomentsFeed(currentMomentsAuthorId);
        } else if (viewName === 'contactDetails') {
            const contact = contacts.find(c => c.id === options.contactId);
            if (contact) {
                document.getElementById('contact-details-profile-card').dataset.contactId = contact.id;
                document.getElementById('contact-details-avatar').src = getAvatar(contact.id);
                document.getElementById('contact-details-name').textContent = getDisplayName(contact.id, null);
                document.getElementById('contact-details-avatar').dataset.contactId = contact.id;
                
                const privateWallpaperBtn = document.getElementById('set-private-chat-wallpaper-btn');
                const relevantConvo = conversations.find(c => c.type === 'single' && c.members.includes(contact.id));
                if(relevantConvo) {
                    privateWallpaperBtn.style.display = 'flex';
                    privateWallpaperBtn.dataset.convoId = relevantConvo.id;
                } else {
                    privateWallpaperBtn.style.display = 'none';
                }
            }
        } else if (viewName === 'groupSettings') {
            const conversation = conversations.find(c => c.id === options.conversationId);
            if(conversation) {
                document.getElementById('group-settings-view').dataset.conversationId = conversation.id;
                document.getElementById('group-settings-name').textContent = conversation.name;
                const grid = document.getElementById('group-settings-member-grid');
                grid.innerHTML = '';
                
                conversation.members.forEach(memberId => {
                    const memberDiv = document.createElement('div');
                    memberDiv.className = 'group-member-item';
                    memberDiv.dataset.memberId = memberId;
                    
                    let roleText = '';
                    if (memberId === conversation.owner) {
                        roleText = ' <span class="member-role">(群主)</span>';
                    } else if (conversation.admins && conversation.admins.includes(memberId)) {
                         roleText = ' <span class="member-role">(管理员)</span>';
                    }

                    memberDiv.innerHTML = `<img src="${getAvatar(memberId)}"><span class="member-name-role">${getDisplayName(memberId, conversation.id)}${roleText}</span>`;
                    grid.appendChild(memberDiv);
                });
                if(!conversation.userIsObserver) {
                    const addBtn = document.createElement('div');
                    addBtn.className = 'add-member-btn';
                    addBtn.innerHTML = '+';
                    addBtn.id = "group-add-member-btn";
                    grid.appendChild(addBtn);
                }
                
                const dissolveBtn = document.getElementById('group-dissolve-btn');
                if (conversation.dissolved) {
                     dissolveBtn.innerHTML = `<span class="item-label" style="flex-grow: 1; text-align: center; color: var(--wechat-green-icon);">恢复群聊</span>`;
                     dissolveBtn.dataset.action = "recover";
                } else if (conversation.userIsObserver) {
                    dissolveBtn.innerHTML = `<span class="item-label danger" style="flex-grow: 1; text-align: center;">删除此聊天</span>`;
                    dissolveBtn.dataset.action = "delete";
                } else {
                     dissolveBtn.innerHTML = `<span class="item-label danger" style="flex-grow: 1; text-align: center;">解散群聊</span>`;
                     dissolveBtn.dataset.action = "dissolve";
                }
            }
        }
    }


    function addLongPressListener(element, callback, options = { duration: 600, preventDefault: true }) {
        let timer;
        let startX, startY;

        const onStart = (e) => {
            if (e.type === 'mousedown' && e.button !== 0) return;
            startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
            if (options.preventDefault) e.preventDefault();
            clearTimeout(timer);
            timer = setTimeout(() => { timer = null; callback(e); }, options.duration);
        };

        const onMove = (e) => {
            if (!timer) return;
            const moveX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const moveY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
            if (Math.abs(moveX - startX) > 10 || Math.abs(moveY - startY) > 10) {
                clearTimeout(timer);
            }
        };

        const onEnd = () => clearTimeout(timer);
        
        element.addEventListener('pointerdown', onStart);
        element.addEventListener('pointermove', onMove);
        element.addEventListener('pointerup', onEnd);
        element.addEventListener('pointerleave', onEnd);

        if (options.preventDefault) {
            element.addEventListener('contextmenu', e => e.preventDefault());
        }
    }

    function addEntryToUI(entry, index) {
        if (entry.key === 'RECALL_MESSAGE') {
            const targetText = entry.data.target_text;
            const author = entry.data.author;
            const messageRows = Array.from(wechatBody.querySelectorAll('.message-row')).reverse();
            const rowToRecall = messageRows.find(row => {
                const bubble = row.querySelector('.message-bubble');
                if(!bubble) return false;
                const rowAuthorId = row.querySelector('.message-avatar').dataset.senderId;
                return rowAuthorId === author && bubble.textContent.trim() === targetText;
            });

            if (rowToRecall) {
                addRecallNotice(entry, rowToRecall, index);
            }
            return;
        }

        switch(entry.type) {
            case 'event_log':
                addEventLogToWeChat(entry.content, index);
                break;
            case 'group_event':
                addGroupEventToWeChat(entry.content, index);
                break;
            case 'time':
                break;
            case undefined:
                 if (!entry.key) {
                     console.warn("Undefined entry type, skipping UI add:", entry);
                 }
                 break;
            default:
                addMessageToWeChat(entry, index);
                break;
        }
    }

    function addMessageToWeChat(entry, index) {
        const { id, sender, type, data } = entry;
        const from = (sender === 'user' || sender === '{{user}}') ? 'me' : 'them';
        const convoId = entry.convoId || entry.conversationId;
        const conversation = conversations.find(c => c.id === convoId);
        
        const messageRow = document.createElement('div');
        messageRow.className = 'message-row ' + from;
        if (index !== undefined) messageRow.dataset.logIndex = index;
        messageRow.dataset.messageId = id;
        
        const senderIdForAvatar = (from === 'me') ? 'user' : sender;
        const avatarSrc = getAvatar(senderIdForAvatar);
        const avatarImgHtml = `<img src="${avatarSrc}" class="message-avatar" data-sender-id="${senderIdForAvatar}">`;
        
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'message-content-wrapper';

        if (conversation && conversation.type === 'group' && from === 'them') {
             const nameLabel = document.createElement('div');
             nameLabel.className = 'sender-name-label';
             nameLabel.textContent = getDisplayName(sender, convoId);
             contentWrapper.appendChild(nameLabel);
        }
        
        let bubbleHtml = '';
        let bubbleClasses = 'message-bubble';
        
        switch (type) {
            case 'sticker':
                const stickerUrl = findStickerUrlByName(entry.content);
                if (stickerUrl) {
                    bubbleHtml = `<img src="${stickerUrl}" alt="${entry.content}">`;
                    bubbleClasses += ' sticker-bubble';
                } else {
                    bubbleHtml = `[表情: ${entry.content}]`;
                }
                break;
            case 'forward':
                const fwdData = entry.data;
                let summaryHtml = '';
                const isMomentForward = fwdData.messageIds && fwdData.messageIds.length > 0 && fwdData.messageIds[0].startsWith('moment_');

                if (isMomentForward) {
                    const momentIndex = parseInt(fwdData.messageIds[0].replace('moment_', ''), 10);
                    const originalMoment = blmxManager.logEntries[momentIndex];
                    if (originalMoment) {
                         summaryHtml = `<p>${getDisplayName(originalMoment.data.author, null)}: ${originalMoment.data.text.substring(0, 20) || '[图片]'}</p>`;
                    }
                } else {
                    const messagesToDisplay = fwdData.messageIds.map(msgId => blmxManager.logEntries.find(e => e.id === msgId)).filter(Boolean);
                    messagesToDisplay.slice(0, 2).forEach(msg => {
                        const msgContent = (typeof msg.content === 'object' && msg.type !== 'voice') ? `[${msg.type || '复合消息'}]` : (msg.content.text || msg.content);
                        summaryHtml += `<p>${getDisplayName(msg.senderId || msg.sender, null)}: ${msgContent.substring(0, 20)}</p>`;
                    });
                }
                
                bubbleHtml = `<div class="forward-card" data-forward-id="${id}" data-message-ids='${JSON.stringify(fwdData.messageIds)}'>
                                <div class="forward-title">${fwdData.title}</div>
                                <div class="forward-summary">${summaryHtml}</div>
                              </div>`;
                bubbleClasses += ' forward-bubble';
                break;
            case 'image':
                if (entry.content && entry.content.type === 'url') {
                    let imageUrl = entry.content.value;
                    if (imageUrl.startsWith('blmx-img-')) {
                        const storedImage = sessionStorage.getItem(imageUrl);
                        imageUrl = storedImage || 'https://files.catbox.moe/bialj8.jpeg';
                    }
                    bubbleHtml = `<img src="${imageUrl}" alt="图片">`;
                    bubbleClasses += ' image-url-bubble';
                } else { 
                    const descText = (entry.content && entry.content.value) ? entry.content.value : entry.content;
                    bubbleHtml = `<div class="image-desc-content">${String(descText).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>`;
                    bubbleClasses += ' image-desc-bubble';
                }
                break;
            case 'location':
                bubbleHtml = `<div class="location-card"><div class="location-content"><div class="location-title">${entry.content}</div><div class="location-subtitle">共享实时位置</div></div><div class="location-map-placeholder"></div></div>`;
                bubbleClasses += ' location-bubble';
                break;
            case 'transfer': {
                const transferData = typeof data === 'string' ? JSON.parse(data) : data;
                const isReceipt = transferData.status !== 'sent';
                let recipientNote = '';
                if(conversation && conversation.type === 'group' && transferData.recipientId) {
                    recipientNote = `<div class="recipient-note">转账给：${getDisplayName(transferData.recipientId, convoId)}</div>`;
                }
                const detailsHtml = isReceipt 
                    ? `<div class="status-text">${transferData.status === 'accepted' ? '已接收' : '已退还'}</div>` 
                    : `${recipientNote}<div class="note">${transferData.note || ' '}</div>`;
                const cardClass = isReceipt ? 'transfer-receipt' : 'transfer-initial';
                bubbleHtml = `<div class="transfer-card ${cardClass}"><div class="transfer-content"><img src="https://files.catbox.moe/y8059q.png" class="transfer-icon-image"><div class="transfer-details"><div class="amount">¥${transferData.amount}</div>${detailsHtml}</div></div><div class="transfer-footer">转账</div></div>`;
                bubbleClasses += ' transfer-bubble';
                break;
            }
            case 'file':
                bubbleHtml = `<div class="file-card"><div class="file-content"><i class="fas fa-file-alt file-icon"></i><div class="file-details"><div class="file-name">${entry.content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div></div></div><div class="file-footer">文件</div></div>`;
                bubbleClasses += ' file-bubble';
                break;
            case 'gift': {
                const giftData = typeof data === 'string' ? JSON.parse(data) : data;
                let recipientNote = '';
                if(conversation && conversation.type === 'group' && giftData.recipientId) {
                    recipientNote = `<div class="recipient-note">送给：${getDisplayName(giftData.recipientId, convoId)}</div>`;
                }
                let detailsHtml = '';
                if (giftData.status === 'sent') {
                    detailsHtml = `${recipientNote}` + (giftData.price ? `<div class="gift-price">¥ ${giftData.price}</div>` : '');
                } else {
                    detailsHtml = `<div class="gift-status-text">${giftData.status === 'accepted' ? '已收下' : '已拒收'}</div>`;
                }
                bubbleHtml = `<div class="gift-content"><i class="fas fa-gift gift-icon"></i><div class="gift-details"><div class="gift-name">${giftData.name}</div>${detailsHtml}</div></div><div class="gift-footer">礼物</div>`;
                bubbleClasses += ' gift-bubble';
                break;
            }
             case 'red_packet': {
                const packetData = entry.content;
                bubbleHtml = `
                    <div class="red-packet-card">
                        <div class="red-packet-content">
                            <i class="fas fa-wallet red-packet-icon"></i>
                            <div class="red-packet-details">
                                <div class="red-packet-title">${packetData.title}</div>
                            </div>
                        </div>
                        <div class="red-packet-footer">微信红包</div>
                    </div>`;
                bubbleClasses += ' red-packet-bubble';
                break;
            }
            case 'voice':
                bubbleHtml = `<span class="duration">${entry.content.duration}"</span><i class="fas fa-wifi voice-icon"></i>`;
                bubbleClasses += ' voice-bubble';
                break;
            default:
                bubbleHtml = entry.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                break;
        }

        const bubble = document.createElement('div');
        bubble.className = bubbleClasses;
        bubble.innerHTML = bubbleHtml;
        contentWrapper.appendChild(bubble);
        
        const forwardCheckbox = document.createElement('input');
        forwardCheckbox.type = 'checkbox';
        forwardCheckbox.className = 'forward-checkbox';
        forwardCheckbox.dataset.messageId = id;

        if (from === 'me') {
            messageRow.appendChild(contentWrapper);
            messageRow.insertAdjacentHTML('beforeend', avatarImgHtml);
            messageRow.insertAdjacentElement('afterbegin', forwardCheckbox);
        } else {
            messageRow.insertAdjacentHTML('afterbegin', avatarImgHtml);
            messageRow.appendChild(contentWrapper);
            messageRow.insertAdjacentElement('afterbegin', forwardCheckbox);
        }
        
        if (type === 'voice') {
            const textRevealBox = document.createElement('div');
            textRevealBox.className = 'voice-text-content';
            textRevealBox.textContent = entry.content.text;
            contentWrapper.appendChild(textRevealBox);

            let longPressFired = false;
            let pressTimer;
            bubble.addEventListener('pointerdown', (e) => {
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                longPressFired = false;
                pressTimer = setTimeout(() => {
                    textRevealBox.style.display = 'block';
                    longPressFired = true;
                }, 500);
            });
            bubble.addEventListener('pointerup', () => {
                clearTimeout(pressTimer);
                if (!longPressFired) textRevealBox.style.display = textRevealBox.style.display === 'block' ? 'none' : 'block';
            });
            bubble.addEventListener('pointerleave', () => clearTimeout(pressTimer));
        }
        if (type === 'forward') {
            const card = bubble.querySelector('.forward-card');
            card.addEventListener('click', () => {
                const messageIds = JSON.parse(card.dataset.messageIds);
                if (messageIds && messageIds.length > 0 && messageIds[0].startsWith('moment_')) {
                    renderForwardedMomentModal(messageIds[0]);
                } else {
                    const fwdEntry = blmxManager.logEntries.find(e => e.id === card.dataset.forwardId);
                    if (fwdEntry) renderForwardedContentModal(fwdEntry.data);
                }
            });
        }
        if (type === 'transfer' && from === 'them' && data.status === 'sent') {
            const transferCard = bubble.querySelector('.transfer-card');
            transferCard.classList.add('them');
            transferCard.addEventListener('click', () => {
                const status = confirm(`接收来自 ${getDisplayName(sender, convoId)} 的转账？\n(选择“取消”将视为退还)`) ? 'accepted' : 'rejected';
                const receiptData = { amount: data.amount, status };
                stageAndDisplayEntry({ type: 'transfer', sender: 'me', content: JSON.stringify(receiptData), data: receiptData });
            }, { once: true });
        }
        
        if (type === 'gift' && from === 'them' && data.status === 'sent') {
            bubble.style.cursor = 'pointer';
            bubble.addEventListener('click', () => {
                const action = confirm(`接收来自 ${getDisplayName(sender, convoId)} 的礼物 "${data.name}" 吗？\n(选择“取消”将视为拒收)`) ? 'accepted' : 'rejected';
                const receiptData = { name: data.name, status: action };
                stageAndDisplayEntry({ type: 'gift', sender: 'me', content: JSON.stringify(receiptData), data: receiptData });
                hasPendingNotifications = true;
                updateFooterButtonsState();
                bubble.style.cursor = 'default';
            }, { once: true });
        }

        if (type === 'red_packet' && from === 'them') {
             bubble.querySelector('.red-packet-card').addEventListener('click', () => {
                alert(`你领取了 ${getDisplayName(sender, convoId)} 的红包。`);
             }, { once: true });
        }
        
        if (from === 'me' && type === 'message') {
            addLongPressListener(bubble, () => {
                const logEntry = blmxManager.logEntries.find(e => e.id === id) || userMessageQueue.find(e => e.id === id);
                if (!logEntry) return;

                const timeString = new Date(window.currentGameDate).toISOString().slice(0, 16);
                const recallTimestamp = promptForTimestamp("输入撤回时间 (格式 YYYY-MM-DDTHH:mm)", timeString);
                if (recallTimestamp) {
                    if (confirm('是否要撤回这条消息？')) {
                        const recallData = {
                            author: 'user',
                            target_text: logEntry.content,
                            timestamp: recallTimestamp
                        };

                        const recallEntry = {
                            key: 'RECALL_MESSAGE',
                            data: recallData
                        };

                        blmxManager.addEntry(recallEntry);

                        const indexInQueue = userMessageQueue.findIndex(e => e.id === id);
                        if (indexInQueue > -1) {
                             userMessageQueue.splice(indexInQueue, 1);
                        }
                        
                        blmxManager.persistLogToStorage();
                        renderChatHistory(currentConversationId);
                    }
                }
            });
        }
        
        wechatBody.appendChild(messageRow); wechatBody.scrollTop = wechatBody.scrollHeight;
    }
    
    function addRecallNotice(entry, elementToReplace, index) {
        const who = getDisplayName(entry.data.author, entry.conversationId);
        const noticeRow = document.createElement('div');
        noticeRow.className = 'timestamp-row';
        if (index !== undefined) noticeRow.dataset.logIndex = index;

        const recalledText = entry.data.target_text || '(内容未知)';
        
        noticeRow.innerHTML = `
            <div class="recall-notice-container">
                <div class="recall-notice-text">"${who}" 撤回了一条消息</div>
                <div class="recall-content">${recalledText}</div>
            </div>
        `;

        const noticeTextEl = noticeRow.querySelector('.recall-notice-text');
        const contentEl = noticeRow.querySelector('.recall-content');
        
        noticeTextEl.addEventListener('click', () => {
            contentEl.classList.toggle('expanded');
        });

        if (elementToReplace) {
            elementToReplace.replaceWith(noticeRow);
        } else {
            wechatBody.appendChild(noticeRow);
        }
    }
    
    function renderChatHistory(conversationId) {
        wechatBody.innerHTML = ''; 
        if (!blmxManager) return;
        
        let entriesInLog = blmxManager.logEntries
            .map((entry, index) => ({ ...entry, originalIndex: index })) 
            .filter(entry => {
                const convoId = entry.convoId || entry.conversationId || (entry.content && entry.content.convoId) || (entry.data && entry.data.convoId);
                return convoId === conversationId;
            });
        
        const recallCommandsInConvo = entriesInLog.filter(e => e.key === 'RECALL_MESSAGE');
        let entriesToRender = [...entriesInLog];

        for (const recallCmd of recallCommandsInConvo) {
            const indexToRemove = entriesToRender.findIndex(e => 
                e.type === 'message' && 
                e.sender === recallCmd.data.author && 
                e.content === recallCmd.data.target_text
            );
            if (indexToRemove > -1) {
                entriesToRender.splice(indexToRemove, 1);
            }
        }
        
        const queuedEntries = userMessageQueue
            .filter(entry => entry.conversationId === conversationId)
            .map((entry, index) => ({ ...entry, originalIndex: blmxManager.logEntries.length + index }));
        
        const allEntries = [...entriesToRender, ...queuedEntries];

        allEntries.forEach(entry => {
            addEntryToUI(entry, entry.originalIndex);
        });
        
        wechatBody.scrollTop = wechatBody.scrollHeight;
    }

    function addEventLogToWeChat(eventData, index) {
        const timeText = formatMomentTimestamp(eventData.timestamp);
        const row = document.createElement('div');
        row.className = 'event-log-row';
        if (index !== undefined) row.dataset.logIndex = index;
        
        row.innerHTML = `
            <div class="event-log-container">
                <div class="event-time-text">${timeText}</div>
                <div class="event-description">${eventData.description || ''}</div>
            </div>
        `;

        if (eventData.description) {
            const timeEl = row.querySelector('.event-time-text');
            const descEl = row.querySelector('.event-description');
            timeEl.classList.add('has-desc');
            timeEl.addEventListener('click', () => {
                descEl.classList.toggle('expanded');
            });
        }
        
        wechatBody.appendChild(row);
    }
    
    function getGroupEventDescription(eventData) {
        let text = '';
        const actorName = getDisplayName(eventData.author, eventData.convoId);
        switch (eventData.type) {
            case 'create':
                text = `"${actorName}"创建了群聊`;
                break;
            case 'add':
                const addedNames = eventData.targetIds.map(id => `"${getDisplayName(id, eventData.convoId)}"`).join('、');
                text = `"${actorName}"邀请了${addedNames}加入了群聊`;
                break;
            case 'remove':
            case 'kick':
                text = `"${getDisplayName(eventData.targetId, eventData.convoId)}"已被"${actorName}"移出群聊`;
                break;
            case 'leave':
                text = `"${actorName}"退出了群聊`;
                break;
            case 'rename':
                text = `"${actorName}"修改群名为“${eventData.newName}”`;
                break;
            case 'mute':
                text = `"${getDisplayName(eventData.targetId, eventData.convoId)}"被"${actorName}"禁言${eventData.duration}分钟`;
                break;
            case 'unmute':
                text = `"${getDisplayName(eventData.targetId, eventData.convoId)}"已被"${actorName}"解除禁言`;
                break;
            case 'unmute_auto':
                text = `"${getDisplayName(eventData.targetId, eventData.convoId)}"的禁言已到期，自动解除`;
                break;
            case 'set_admin':
                 text = `"${actorName}"已将"${getDisplayName(eventData.targetId, eventData.convoId)}"设为管理员`;
                 break;
            case 'unset_admin':
                 text = `"${getDisplayName(eventData.targetId, eventData.convoId)}"的管理员已被"${actorName}"取消`;
                 break;
            case 'nickname_change':
                const targetCurrentName = eventData.oldName || getDisplayName(eventData.targetId, eventData.convoId);
                const actorCurrentName = getDisplayName(eventData.author, eventData.convoId);
                if (eventData.targetId === eventData.author) {
                    text = `"${actorCurrentName}"将自己的群昵称修改为“${eventData.newName}”`;
                } else {
                    text = `"${actorCurrentName}"将群内“${targetCurrentName}”的昵称修改为“${eventData.newName}”`;
                }
                break;
            case 'dissolve':
                 text = `群聊已被"${actorName}"解散`;
                 break;
            case 'red_packet_grab':
                 text = `${eventData.grabberName}领取了${actorName}的红包`;
                 if(eventData.amount) text += `，抢了${eventData.amount.toFixed(2)}元`;
                 if(eventData.isLuckiest) text += `，是运气王`;
                 break;
        }
        return text;
    }

    function addGroupEventToWeChat(eventData, index) {
        const text = getGroupEventDescription(eventData);
        if(!text) return;
        const row = document.createElement('div');
        row.className = 'system-event-row';
        if (index !== undefined) row.dataset.logIndex = index;
        row.innerHTML = `<span class="system-event-text">${text}</span>`;
        wechatBody.appendChild(row);
    }
    
    function formatMomentTimestamp(timestamp) {
        if (!timestamp) return ' ';
        const postDateTime = new Date(timestamp.replace(' ', 'T'));
        if (isNaN(postDateTime)) return ' ';

        const now = new Date(window.currentGameDate);
        
        const postYear = postDateTime.getFullYear();
        const postMonth = postDateTime.getMonth();
        const postDay = postDateTime.getDate();
        
        const nowYear = now.getFullYear();
        const nowMonth = now.getMonth();
        const nowDay = now.getDate();
        
        const timeString = timestamp.substring(11, 16);

        if (postYear === nowYear && postMonth === nowMonth && postDay === nowDay) {
            return timeString;
        }

        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (postYear === yesterday.getFullYear() && postMonth === yesterday.getMonth() && postDay === yesterday.getDate()) {
            return `昨天 ${timeString}`;
        }
        
        if (postYear === nowYear) {
            return `${postMonth + 1}月${postDay}日 ${timeString}`;
        }
        
        return `${postYear}年${postMonth + 1}月${postDay}日`;
    }

    function renderMomentsFeed(authorIdToShow) {
        if (!blmxManager) return;
        
        const showAll = !authorIdToShow;
        const authorIsUser = authorIdToShow === 'user';
        const author = authorIsUser ? userProfile : contacts.find(c => c.id === authorIdToShow);
        
        const headerAuthor = showAll ? userProfile : author;
        if (!headerAuthor) {
            console.error("Cannot render moments for unknown author:", authorIdToShow);
            return;
        }

        document.getElementById('moments-cover-photo').src = headerAuthor.cover || 'https://files.catbox.moe/bialj8.jpeg';
        document.getElementById('moments-user-avatar').src = getAvatar(headerAuthor.id);
        document.getElementById('moments-user-name').textContent = getDisplayName(headerAuthor.id, null);
        document.getElementById('user-signature-display').textContent = headerAuthor.signature || '';
        document.getElementById('post-moment-btn').style.display = (showAll || authorIsUser) ? 'block' : 'none';
        
        const coverPhotoEl = document.getElementById('moments-cover-photo');
        coverPhotoEl.onclick = () => {
            const currentAuthorForCover = showAll ? userProfile : author;
            const newCover = prompt(`为 ${getDisplayName(currentAuthorForCover.id, null)} 输入新的朋友圈封面URL:`, currentAuthorForCover.cover || '');
            if (newCover !== null) {
                currentAuthorForCover.cover = newCover;
                coverPhotoEl.src = newCover;
                saveData();
            }
        };
        
        momentsFeedList.innerHTML = '';

        let allMomentPostsWithIndex = blmxManager.logEntries
            .map((entry, index) => ({ ...entry, originalIndex: index }))
            .filter(e => e.key === 'MOMENT');

        const postsToRender = {};

        allMomentPostsWithIndex.forEach(post => {
            const { data } = post;
            const authorId = data.author;

            let isVisibleToUser = true;
            if (data.invisibleTo && (data.invisibleTo.includes('user') || data.invisibleTo.includes('{{user}}'))) {
                isVisibleToUser = false;
            } else if (data.visibleTo && data.visibleTo.length > 0 && !(data.visibleTo.includes('user') || data.visibleTo.includes('{{user}}'))) {
                isVisibleToUser = false;
            }
            
            if (isVisibleToUser && (!authorIdToShow || data.author === authorIdToShow)) {
                postsToRender[post.originalIndex] = { ...post, likes: [], comments: [] };
            }
        });

        blmxManager.logEntries.forEach(interactionEntry => {
            if (interactionEntry.key === 'CHAR_LIKE' || interactionEntry.key === 'CHAR_COMMENT') {
                const targetPostInSequence = allMomentPostsWithIndex[parseInt(interactionEntry.data.target_post_id, 10)];

                if (targetPostInSequence) {
                    const targetPostOriginalIndex = targetPostInSequence.originalIndex;
                    if (postsToRender[targetPostOriginalIndex]) {
                        if (interactionEntry.key === 'CHAR_LIKE') {
                            const likerName = getDisplayName(interactionEntry.data.author, null);
                            if (!postsToRender[targetPostOriginalIndex].likes.some(l => l.name === likerName)) {
                                postsToRender[targetPostOriginalIndex].likes.push({ name: likerName });
                            }
                        } else {
                            postsToRender[targetPostOriginalIndex].comments.push({ ...interactionEntry });
                        }
                    }
                }
            }
        });
        
        Object.values(postsToRender).reverse().forEach(post => {
            const authorId = post.data.author;
            const authorName = getDisplayName(authorId, null);
            const authorAvatar = getAvatar(authorId);
            const fromUser = authorId === 'user';
            
            const li = document.createElement('li');
            li.className = 'moment-post';
            li.dataset.postId = post.originalIndex;
            li.dataset.authorId = authorId;
            const momentSequenceId = allMomentPostsWithIndex.findIndex(p => p.originalIndex === post.originalIndex);
            li.dataset.momentSequenceId = momentSequenceId;

            let mediaHtml = '';
            if (post.data.image_type === 'url' && post.data.image) mediaHtml = `<img src="${post.data.image}" class="post-media-image">`;
            else if (post.data.image_type === 'desc' && post.data.image) mediaHtml = `<div class="image-desc-content">${post.data.image}</div>`;
            
            let interactionsHtml = '';
            if (post.likes.length > 0 || post.comments.length > 0) {
                const likersHtml = post.likes.length > 0 ? `<div class="likes-section"><i class="fas fa-heart"></i> ${post.likes.map(l => `<span class="liker-name">${l.name}</span>`).join(', ')}</div>` : '';
                const commentsHtml = post.comments.length > 0 ? `<ul class="comments-section">${post.comments.map(c => `<li><span class="comment-author">${getDisplayName(c.data.author, null)}</span>: ${c.data.text}</li>`).join('')}</ul>` : '';
                interactionsHtml = `<div class="post-interactions">${likersHtml}${commentsHtml}</div>`;
            }

            const { isPrivate, visibleTo, invisibleTo } = post.data;
            const displayTime = formatMomentTimestamp(post.data.timestamp);
            const deleteBtnHtml = fromUser ? `<i class="fas fa-trash-alt delete-moment-btn" title="删除"></i>` : '';
            
            let privacyIconHtml = '';
            if (isPrivate) {
                privacyIconHtml = `<i class="fas fa-lock private-icon" title="私密，点击可公开"></i>`;
            } else if ((visibleTo && visibleTo.length > 0) || (invisibleTo && invisibleTo.length > 0)) {
                privacyIconHtml = `<i class="fas fa-user-friends visibility-icon" title="部分可见/不可见"></i>`;
            }

            let canInteract = true;
            if (isPrivate && authorId !== 'user') canInteract = false;
            const commentButtonClass = canInteract ? "comment-button" : "comment-button disabled";
            const forwardButtonClass = canInteract && !isPrivate ? "forward-button" : "forward-button disabled";


            li.innerHTML = `<img src="${authorAvatar}" alt="Avatar" class="post-author-avatar">
                                         <div class="post-details">
                                             <span class="post-author-name">${authorName}</span>
                                             <p class="post-content">${post.data.text || ''}</p>
                                             <div class="post-media">${mediaHtml}</div>
                                             <div class="post-meta">
                                                 <div class="post-meta-left">
                                                     <span class="timestamp">${displayTime}</span>
                                                     ${privacyIconHtml}
                                                     ${deleteBtnHtml}
                                                 </div>
                                                 <div class="post-actions">
                                                     <span class="${forwardButtonClass}" title="转发"><i class="fas fa-share-alt"></i></span>
                                                     <span class="${commentButtonClass}" title="评论/点赞"><i class="fas fa-comment-dots"></i></span>
                                                 </div>
                                             </div>
                                             ${interactionsHtml}
                                         </div>`;
            momentsFeedList.appendChild(li);
        });
    }


    function stageAndDisplayEntry(entry) {
        if (!currentConversationId) {
            alert("错误：没有活动的聊天窗口。");
            return;
        }

        const conversation = conversations.find(c => c.id === currentConversationId);
        if (conversation && conversation.muted && (conversation.muted['user'] || conversation.muted['{{user}}'])) {
            const muteInfo = conversation.muted['user'] || conversation.muted['{{user}}'];
            const muteUntil = new Date(muteInfo);
            if (new Date() < muteUntil) {
                alert("你已被禁言！");
                return;
            }
        }
        
        const uiEntry = { ...entry, conversationId: currentConversationId, sender: 'user', id: `msg-pending-${Date.now()}-${Math.random()}` };
        
        userMessageQueue.push(uiEntry);
        renderChatHistory(currentConversationId);
        updateFooterButtonsState();
    }
    
    async function triggerAiResponse(isMergeSendOrForce, isObserverPoke = false) {
        if (isGenerating || !blmxManager) return;
        
        let useGlobalContext = false;
        if (isMergeSendOrForce && !isObserverPoke) {
             useGlobalContext = confirm("是否启用全局模式进行回复？\n(是/OK = AI可回复所有新消息的对话)\n(否/Cancel = AI仅回复当前对话)");
        }
        
        isGenerating = true;
        updateFooterButtonsState();

        let activeConvoIds = [];
        if (isObserverPoke && currentConversationId) {
            activeConvoIds.push(currentConversationId);
        } else if (useGlobalContext) {
            activeConvoIds = conversations
                .filter(c => userMessageQueue.some(m => m.conversationId === c.id))
                .map(c => c.id);
             if (hasPendingNotifications && currentConversationId && !activeConvoIds.includes(currentConversationId)) {
                activeConvoIds.push(currentConversationId);
            }
        } else {
            if (userMessageQueue.length > 0) {
                activeConvoIds = [userMessageQueue[0].conversationId];
            } else if (currentConversationId) {
                 activeConvoIds = [currentConversationId];
            }
        }
        
        if (isMergeSendOrForce && userMessageQueue.length === 0 && activeConvoIds.length === 0 && currentConversationId) {
            activeConvoIds.push(currentConversationId);
        }

        if (activeConvoIds.length === 0) {
            isGenerating = false;
            updateFooterButtonsState();
            return;
        }

        const messagesToProcess = [...userMessageQueue];
        userMessageQueue = [];
        hasPendingNotifications = false;
        
        messagesToProcess.forEach(entry => {
             blmxManager.addEntry(entry);
        });
        
        const now = new Date(window.currentGameDate);
        conversations.forEach(convo => {
            if (convo.muted) {
                for (const memberId in convo.muted) {
                    if (now >= new Date(convo.muted[memberId])) {
                        delete convo.muted[memberId];
                        blmxManager.addEntry({type: 'group_event', content: {type: 'unmute_auto', convoId: convo.id, targetId: memberId, timestamp: now.toISOString().substring(0, 16).replace('T', ' ') }});
                    }
                }
            }
        });

        const allActiveMembers = new Set();
        activeConvoIds.forEach(convoId => {
            const convo = conversations.find(c => c.id === convoId);
            if(convo) convo.members.forEach(m => { if (m !== 'user') allActiveMembers.add(m) });
        });

        const activeStickers = {};
        allActiveMembers.forEach(memberId => {
             const convoIdForStickerLookup = useGlobalContext ? null : activeConvoIds[0];
             activeStickers[memberId] = getAvailableStickersForActor(memberId, convoIdForStickerLookup);
        });

        const contextForAI = blmxManager.getContextForAI(activeConvoIds, contacts, conversations, useGlobalContext, isObserverPoke, activeStickers);
        await blmxManager.persistLogToStorage();
        
        const responseRegex = /^\[([^\]]+)\]\s+([^:]+):\s+(.*)$/;
        
        try {
            const stream = await tavernGenerateFunc({ user_input: contextForAI, should_stream: true });
            let finalAiResponse = '';
            for await (const chunk of stream) { finalAiResponse += chunk; }

            const responseLines = finalAiResponse.trim().split('\n').filter(line => line.trim());
            
            if (responseLines.length > 0) {
                for(const line of responseLines) {
                    let handled = false;
                    const chatMatch = useGlobalContext ? line.match(responseRegex) : null;

                    if (chatMatch) {
                        const targetConversationId = chatMatch[1];
                        const senderId = chatMatch[2];
                        const value = chatMatch[3];
                        handleAiChatMessage(value, senderId, targetConversationId);
                        handled = true;
                    } else if (!useGlobalContext && line.includes(':')) {
                        const firstColonIndex = line.indexOf(':');
                        const senderId = line.substring(0, firstColonIndex).trim();
                        const value = line.substring(firstColonIndex + 1).trim();
                        handleAiChatMessage(value, senderId, activeConvoIds[0]);
                        handled = true;
                    } 
                    
                    if (!handled) {
                        const firstColonIndex = line.indexOf(':');
                        if (firstColonIndex === -1) continue;

                        const key = line.substring(0, firstColonIndex).trim();
                        const value = line.substring(firstColonIndex + 1).trim();
                        
                        try {
                             const data = JSON.parse(value);
                             handleAiSystemCommand(key, data);
                        } catch(e) { console.error(`[BLMX] Failed to parse AI command JSON: ${value}`, e); }
                    }
                }

                if (document.getElementById('wechat-chat-view').classList.contains('active')) {
                    renderChatHistory(currentConversationId);
                }
                renderMomentsFeed(currentMomentsAuthorId);
                renderConversationList();
                updateAppBadge();
            }
        } catch (error) {
            console.error(`[BLMX] AI generation failed:`, error);
        }

        await blmxManager.persistLogToStorage();
        saveData();
        isGenerating = false;
        updateFooterButtonsState();
    }
    
    function handleAiSystemCommand(key, data) {
         switch(key) {
            case 'EVENT_LOG':
                 blmxManager.addEntry({ type: key.toLowerCase(), content: data });
                 break;
            case 'SIGNATURE_UPDATE': {
                const targetId = data.author;
                let targetObject = null;
                if(targetId === 'user' || targetId === '{{user}}') {
                    targetObject = userProfile;
                } else {
                    targetObject = contacts.find(c => c.id === targetId);
                }
                if(targetObject) {
                    targetObject.signature = data.signature;
                    blmxManager.addEntry({key, data});
                    saveData();
                }
                break;
            }
            case 'RECALL_MESSAGE':
            case 'MOMENT':
                blmxManager.addEntry({ key, data });
                if (key === 'MOMENT' && data.author !== 'user') {
                    const momentsConvo = conversations.find(c => c.id === 'moments_feed');
                    if (momentsConvo) {
                        momentsConvo.unread = (momentsConvo.unread || 0) + 1;
                        momentsConvo.lastActivity = Date.now();
                    }
                }
                break;
            case 'CHAR_COMMENT':
            case 'CHAR_LIKE': {
                blmxManager.addEntry({ key, data });
                const allMoments = blmxManager.logEntries.map((e, i) => ({...e, originalIndex: i})).filter(e => e.key === 'MOMENT');
                const targetPost = allMoments[parseInt(data.target_post_id, 10)];

                if (targetPost && (targetPost.data.author === 'user' || targetPost.data.author === '{{user}}')) {
                    const momentsConvo = conversations.find(c => c.id === 'moments_feed');
                    if (momentsConvo) {
                        momentsConvo.unread = (momentsConvo.unread || 0) + 1;
                        momentsConvo.lastActivity = Date.now();
                    }
                }
                break;
            }
            case 'LEAVE_GROUP': {
                const convo = conversations.find(c => c.id === data.convoId);
                const memberIndex = convo ? convo.members.indexOf(data.author) : -1;

                if (convo && memberIndex > -1) {
                    convo.members.splice(memberIndex, 1);
                    const eventData = { 
                        type: 'leave', 
                        convoId: data.convoId, 
                        author: data.author,
                        timestamp: new Date(window.currentGameDate).toISOString().substring(0, 16).replace('T', ' ')
                    };
                    blmxManager.addEntry({type: 'group_event', content: eventData});
                }
                break;
            }
            case 'KICK_MEMBER':
            case 'MUTE_MEMBER':
            case 'SET_ADMIN':
            case 'CHANGE_NICKNAME':
                const convo = conversations.find(c => c.id === data.convoId);
                if(!convo) break;

                const actorId = data.author;
                const actorIsOwner = convo.owner === actorId;
                const actorIsAdmin = convo.admins && convo.admins.includes(actorId);

                let eventData = { ...data };
                let permissionOk = false;
                let eventType = '';

                if(key === 'MUTE_MEMBER') {
                    eventType = 'mute';
                    if (actorIsOwner || actorIsAdmin) {
                        if(!convo.muted) convo.muted = {};
                        convo.muted[data.targetId] = new Date(new Date().getTime() + data.duration * 60000).toISOString();
                        permissionOk = true;
                    }
                } else if (key === 'KICK_MEMBER') {
                    eventType = 'kick';
                    if (actorIsOwner || actorIsAdmin) {
                        convo.members = convo.members.filter(id => id !== data.targetId);
                        permissionOk = true;
                    }
                } else if (key === 'SET_ADMIN') {
                     eventType = 'set_admin';
                     if (actorIsOwner) {
                         if (!convo.admins) convo.admins = [];
                         if (!convo.admins.includes(data.targetId)) convo.admins.push(data.targetId);
                         permissionOk = true;
                     }
                } else if (key === 'CHANGE_NICKNAME') {
                    eventType = 'nickname_change';
                    eventData.oldName = getDisplayName(data.targetId, data.convoId);
                    if (!convo.nicknames) convo.nicknames = {};

                    if (data.targetId === 'user' || data.targetId === '{{user}}') {
                        convo.nicknames['user'] = data.newName;
                    } else {
                        convo.nicknames[data.targetId] = data.newName;
                    }
                    permissionOk = true;
                }
                
                if(permissionOk) {
                    eventData.type = eventType;
                    eventData.timestamp = new Date(window.currentGameDate).toISOString().substring(0, 16).replace('T', ' ');
                    blmxManager.addEntry({type: 'group_event', content: eventData});
                }
                break;
            case 'CREATE_GROUP':
                 const finalMembers = data.include_user ? ['user', ...data.members] : [...data.members];
                 if(!finalMembers.includes(data.owner)) finalMembers.push(data.owner);
                 const uniqueMembers = [...new Set(finalMembers)];

                 const newGroupId = generateDescriptiveGroupId(uniqueMembers);
                 
                 const newConvo = {
                     id: newGroupId, type: 'group', name: data.name, owner: data.owner,
                     members: uniqueMembers, admins: [], userIsObserver: !data.include_user,
                     lastActivity: Date.now(), unread: 0, pinned: false, nicknames: {}
                 };
                 conversations.push(newConvo);
                 blmxManager.addEntry({ type: 'group_event', content: {type: 'create', author: data.owner, convoId: newGroupId, timestamp: new Date(window.currentGameDate).toISOString().substring(0, 16).replace('T', ' ')}});
                 break;
         }
    }


    function handleAiChatMessage(value, senderId, targetConversationId) {
        const conversation = conversations.find(c => c.id === targetConversationId);
        if (!conversation || !conversation.members.includes(senderId)) {
            console.warn(`[BLMX ROUTING] AI tried to reply as '${senderId}' to conversation '${targetConversationId}' where they are not a member. Ignoring.`);
            return;
        }
        
        if (conversation.muted && conversation.muted[senderId] && new Date() < new Date(conversation.muted[senderId])) return;

        let newEntry = { id: `msg-${Date.now()}-${Math.random()}`, sender: senderId, conversationId: targetConversationId, type: 'message', content: value };
        
        const stickerMatch = value.match(/^\[表情:\s*(.*)\]/);
        const imageMatch = value.match(/^\[图片:\s*(.*)\]/);
        const voiceMatch = value.match(/^\[语音:\s*({.*})\]/);
        const locationMatch = value.match(/^\[位置:\s*(.*)\]/);
        const transferMatch = value.match(/^\[转账:\s*(.*)\]/);
        const fileMatch = value.match(/^\[文件:\s*(.*)\]/);
        const giftMatch = value.match(/^\[礼物:\s*(.*)\]/);
        const redPacketMatch = value.match(/^\[红包:\s*(.*)\]/);
        const forwardMatch = value.match(/^\[forward:\s*(.*)\]/);

        let wasPacket = false;

        if (voiceMatch) { newEntry.type = 'voice'; newEntry.content = JSON.parse(voiceMatch[1]); } 
        else if (stickerMatch) { newEntry.type = 'sticker'; newEntry.content = stickerMatch[1]; }
        else if (imageMatch) { newEntry.type = 'image'; try { newEntry.content = JSON.parse(imageMatch[1]); } catch(e){ newEntry.content = {type:'desc', value: imageMatch[1]}; } }
        else if (locationMatch) { newEntry.type = 'location'; newEntry.content = locationMatch[1]; }
        else if (redPacketMatch) { 
            wasPacket = true;
            newEntry.type = 'red_packet'; newEntry.content = JSON.parse(redPacketMatch[1]); 
            const grabEvents = simulateRedPacketGrab(targetConversationId, senderId, newEntry.content.amount);
            blmxManager.addEntry(newEntry);
            grabEvents.forEach(event => blmxManager.addEntry(event));
        }
        else if (transferMatch) { newEntry.type = 'transfer'; newEntry.data = JSON.parse(transferMatch[1]); newEntry.content = transferMatch[1]; }
        else if (fileMatch) { newEntry.type = 'file'; newEntry.content = fileMatch[1]; }
        else if (giftMatch) { newEntry.type = 'gift'; newEntry.data = JSON.parse(giftMatch[1]); newEntry.content = giftMatch[1]; }
        else if (forwardMatch) { newEntry.type = 'forward'; newEntry.data = JSON.parse(forwardMatch[1]); newEntry.content = forwardMatch[1]; }

        if (!wasPacket) {
            blmxManager.addEntry(newEntry);
        }
        
        if (targetConversationId !== currentConversationId || !document.getElementById('wechat-chat-view').classList.contains('active')) {
            if(!conversation.unread) conversation.unread = 0;
            conversation.unread++;
        }
        conversation.lastActivity = Date.now();
    }

    function simulateRedPacketGrab(convoId, authorId, amount) {
        const convo = conversations.find(c => c.id === convoId);
        if(!convo || convo.type !== 'group') return [];

        const membersToGrab = convo.members.filter(id => id !== authorId && id !== 'user');
        if (membersToGrab.length === 0) return [];
        
        let remaining = Math.round(amount * 100);
        let amounts = [];
        for(let i = 0; i < membersToGrab.length -1; i++) {
            const randomAmount = Math.floor(Math.random() * (remaining - (membersToGrab.length -1 - i))) + 1;
            amounts.push(randomAmount);
            remaining -= randomAmount;
        }
        amounts.push(remaining);
        amounts.sort(() => Math.random() - 0.5);

        let luckiest = { name: '', amount: 0 };
        amounts.forEach((amtCents, i) => {
            const amt = amtCents / 100;
            if (amt > luckiest.amount) {
                luckiest = { name: getDisplayName(membersToGrab[i], convoId), amount: amt };
            }
        });

        const nowTimestamp = new Date(window.currentGameDate).toISOString().substring(0, 16).replace('T', ' ');
        const grabEvents = [];
        amounts.forEach((amtCents, i) => {
            const amt = amtCents / 100;
            const grabberName = getDisplayName(membersToGrab[i], convoId);
            const eventData = {type: 'red_packet_grab', convoId, author: authorId, grabberName, amount: amt, isLuckiest: grabberName === luckiest.name, timestamp: nowTimestamp };
            grabEvents.push({type: 'group_event', content: eventData});
        });
        return grabEvents;
    }

    function updateFooterButtonsState() {
        const hasText = wechatInput.value.trim() !== '';
        const hasQueuedMessages = userMessageQueue.length > 0;
        const islandText = document.getElementById('island-text');
        
        sendBtn.style.display = (hasText || hasQueuedMessages || hasPendingNotifications) ? 'inline-block' : 'none';
        plusBtn.style.display = hasText || isGenerating ? 'none' : 'inline-block';
        
        const pokeBtn = document.getElementById('observer-poke-btn');
        const screenshotBtn = document.getElementById('observer-screenshot-btn');

        if (isGenerating) {
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            if (islandText) islandText.classList.add('is-generating');
            if(pokeBtn) pokeBtn.disabled = true;
            if(screenshotBtn) screenshotBtn.disabled = true;
        } else {
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
            if (islandText) islandText.classList.remove('is-generating');
            if(pokeBtn) pokeBtn.disabled = false;
            if(screenshotBtn) screenshotBtn.disabled = false;
        }
    }
    
    function getAvailableStickersForActor(actorId, convoId) {
        let personalStickers = JSON.parse(localStorage.getItem(getCharStickerStorageKey(actorId)) || '[]');
        let groupStickers = [];

        if(convoId) {
            const convo = conversations.find(c => c.id === convoId);
            if(convo && convo.type === 'group') {
                groupStickers = JSON.parse(localStorage.getItem(getCharStickerStorageKey(convoId)) || '[]');
            }
        }
        
        const allStickers = [...personalStickers, ...groupStickers];
        const uniqueStickers = allStickers.filter((sticker, index, self) => 
            index === self.findIndex((s) => s.label === sticker.label)
        );
        return uniqueStickers;
    }

    function findStickerUrlByName(name) {
        let allStickers = [];
        allStickers.push(...defaultGlobalStickers, ...JSON.parse(localStorage.getItem(GLOBAL_STICKER_STORAGE_KEY) || '[]'));
        
        contacts.forEach(contact => {
            const personalStickers = JSON.parse(localStorage.getItem(getCharStickerStorageKey(contact.id)) || '[]');
            allStickers.push(...personalStickers);
        });

        conversations.forEach(convo => {
            if (convo.type === 'group') {
                const groupStickers = JSON.parse(localStorage.getItem(getCharStickerStorageKey(convo.id)) || '[]');
                allStickers.push(...groupStickers);
            } else if (convo.type === 'single') {
                 const otherMemberId = convo.members.find(m => m !== 'user');
                 if(otherMemberId) {
                     const personalStickers = JSON.parse(localStorage.getItem(getCharStickerStorageKey(otherMemberId)) || '[]');
                     allStickers.push(...personalStickers);
                 }
            }
        });
        
        const uniqueStickers = allStickers.filter((sticker, index, self) => 
            sticker.label && index === self.findIndex((s) => s.label === sticker.label)
        );

        const foundSticker = uniqueStickers.find(s => s.label === name);
        return foundSticker ? foundSticker.url : undefined;
    }
    
    function updateAvatar(contactId) { 
        if (contactId === 'user') {
            const currentUrl = userProfile.avatar || '';
            const newUrl = prompt(`请输入你的新头像URL:`, currentUrl);
            if(newUrl !== null) {
                userProfile.avatar = newUrl;
                document.getElementById('me-view-avatar').src = newUrl;
            }
        } else {
            const targetObject = contacts.find(c => c.id === contactId);
            if (!targetObject) return;

            const currentUrl = targetObject.avatar || '';
            const newUrl = prompt(`请输入 ${getDisplayName(targetObject.id, null)} 的新头像URL:`, currentUrl);

            if (newUrl !== null) {
                targetObject.avatar = newUrl;
            }
        }

        saveData();
        alert('头像已更新！');
        if (currentConversationId) renderChatHistory(currentConversationId);
        renderMomentsFeed(currentMomentsAuthorId);
        renderConversationList();
    }

    function parseAndAddStickers(inputString, storageKey) {
        if (!inputString) return;
        const newStickers = [];
        const parts = inputString.split(',');

        parts.forEach(part => {
            part = part.trim();
            if (!part) return;

            const urlMatch = part.match(/https?:\/\/[^\s]+/);
            if (urlMatch) {
                const url = urlMatch[0];
                const label = part.substring(0, urlMatch.index).trim();
                if (label && url) {
                    newStickers.push({ label, url });
                }
            }
        });

        if (newStickers.length > 0) {
            const currentStickers = JSON.parse(localStorage.getItem(storageKey) || '[]');
            const updatedStickers = [...currentStickers, ...newStickers];
            localStorage.setItem(storageKey, JSON.stringify(updatedStickers));
            alert(`${newStickers.length} 个表情包已添加！`);
        } else {
            alert("未找到有效的表情包格式。请使用 '描述URL, 描述URL' 格式。逗号是英文逗号");
        }
    }

    const GLOBAL_STICKER_FEATURES = {
        get: () => {
            const customStickers = JSON.parse(localStorage.getItem(GLOBAL_STICKER_STORAGE_KEY) || '[]');
            const allStickers = [...defaultGlobalStickers, ...customStickers];
            const features = allStickers.map(s => ({
                label: s.label,
                icon: s.url,
                isDefault: defaultGlobalStickers.some(ds => ds.label === s.label),
                action: () => { stageAndDisplayEntry({type: 'sticker', sender: 'me', content: s.label}); togglePanel(null); }
            }));
            
            features.unshift({ label: '删除', isAddBtn: true, action: () => {
                toggleStickerDeleteMode(stickerGrid, GLOBAL_STICKER_STORAGE_KEY, GLOBAL_STICKER_FEATURES);
            }});
            features.unshift({ label: '添加', isAddBtn: true, action: () => {
                const input = prompt("批量添加通用表情包 (格式: 描述1URL1,描述2URL2...用英文逗号分隔开):");
                parseAndAddStickers(input, GLOBAL_STICKER_STORAGE_KEY);
                renderFeatureGrid(stickerGrid, GLOBAL_STICKER_FEATURES.get());
            }});
            return features;
        }
    };

    const CHAR_STICKER_FEATURES = {
        get: () => {
            if(!currentConversationId) return [];
            const convo = conversations.find(c => c.id === currentConversationId);
            if (!convo) return [];

            let stickersToShow = [];
            let storageKey;
            let panelTitle;

            if (convo.type === 'group') {
                storageKey = getCharStickerStorageKey(convo.id);
                panelTitle = `"${convo.name}"`;
                stickersToShow = JSON.parse(localStorage.getItem(storageKey) || '[]');
            } else {
                const otherMemberId = convo.members.find(m => m !== 'user');
                storageKey = getCharStickerStorageKey(otherMemberId);
                panelTitle = `"${getDisplayName(otherMemberId, convo.id)}"`;
                stickersToShow = JSON.parse(localStorage.getItem(storageKey) || '[]');
            }

            const features = stickersToShow.map(s => ({
                label: s.label,
                icon: s.url,
                isDefault: false,
                action: () => { stageAndDisplayEntry({type: 'sticker', sender: 'me', content: s.label}); togglePanel(null); }
            }));

            features.unshift({ label: '删除', isAddBtn: true, action: () => {
                toggleStickerDeleteMode(charStickerGrid, storageKey, CHAR_STICKER_FEATURES);
            }});
            features.unshift({ label: '添加', isAddBtn: true, action: () => {
                const input = prompt(`为 ${panelTitle} 批量添加专属表情包 (格式: 描述1URL1,描述2URL2...):`);
                parseAndAddStickers(input, storageKey);
                renderFeatureGrid(charStickerGrid, CHAR_STICKER_FEATURES.get());
            }});
            return features;
        }
    };

    const PLUS_FEATURES_PAGE1 = [
        {
            label: '相册',
            icon: 'https://files.catbox.moe/pbxh7d.jpeg',
            action: () => {
                const desc = prompt('请输入图片描述:');
                if (desc) {
                    stageAndDisplayEntry({ type: 'image', sender: 'me', content: { type: 'desc', value: desc } });
                    togglePanel(null);
                }
            }
        },
        { label: '拍摄', icon: 'https://files.catbox.moe/qk90qj.jpeg', action: () => {
            const defaultTime = new Date(window.currentGameDate).toISOString().slice(0, 16);
            const timestamp = promptForTimestamp('请输入事件发生时间 (格式 YYYY-MM-DDTHH:mm)', defaultTime);
            if (!timestamp) return;

            const description = confirm("是否要记录这段时间发生了什么？") ? prompt("请输入事件描述：") : "";

            window.currentGameDate = new Date(timestamp);

            const eventData = { convoId: currentConversationId, timestamp, description: description || "" };
            
            blmxManager.addEntry({type: 'event_log', content: eventData});
            addEventLogToWeChat(eventData);
            blmxManager.persistLogToStorage();
            togglePanel(null);
        } },
        { label: 'https://files.catbox.moe/bialj8.jpeg', icon: 'https://files.catbox.moe/o7mq1c.jpeg', action: () => alert('作者BLMX正在开发此功能中...敬请期待OvO')},
        { label: '位置', icon: 'https://files.catbox.moe/l5pssd.jpeg', action: () => { const loc = prompt('请输入位置:'); if (loc) stageAndDisplayEntry({type: 'location', sender: 'me', content: loc}); togglePanel(null); } },
        { label: '红包', icon: 'https://files.catbox.moe/ettwg5.jpeg', action: () => togglePanel('char-sticker') },
        { label: '转账', icon: 'https://files.catbox.moe/cjlaet.jpeg', action: () => {
            const amountStr = prompt('请输入转账金额:'); const amount = parseFloat(amountStr);
            if (!isNaN(amount) && amount > 0) {
                const note = prompt('请输入转账备注(可选):');
                let transferData = {amount: amount.toFixed(2), note: note || ' ', status: 'sent'};
                
                const convo = conversations.find(c => c.id === currentConversationId);
                if(convo && convo.type === 'group') {
                    showRecipientSelectionModal('transfer', transferData);
                } else {
                    const otherMemberId = convo.members.find(m => m !== 'user');
                    transferData.recipientId = otherMemberId;
                    stageAndDisplayEntry({type: 'transfer', sender: 'me', data: transferData});
                    togglePanel(null);
                }
            } else if (amountStr) { alert('请输入有效金额'); }
        }},
        { label: '文件', icon: 'https://files.catbox.moe/k9taxm.png', action: () => { const fileName = prompt('请输入文件名:'); if (fileName) stageAndDisplayEntry({type: 'file', sender: 'me', content: fileName}); togglePanel(null); } },
        { label: '礼物', icon: 'https://files.catbox.moe/fzsear.jpeg', action: () => {
            const name = prompt("请输入礼物名称:"); if(!name) return;
            const price = confirm("是否输入价格？") ? prompt("请输入价格:") : "";
            let giftData = {name, price, status: 'sent'};

            const convo = conversations.find(c => c.id === currentConversationId);
            if(convo && convo.type === 'group') {
                showRecipientSelectionModal('gift', giftData);
            } else {
                const otherMemberId = convo.members.find(m => m !== 'user');
                giftData.recipientId = otherMemberId;
                stageAndDisplayEntry({type: 'gift', sender: 'me', data: giftData});
                togglePanel(null);
            }
        }},
    ];

    const PLUS_FEATURES_PAGE2 = [
        { label: '群红包', icon: 'https://files.catbox.moe/bialj8.jpeg', action: () => {
            const convo = conversations.find(c => c.id === currentConversationId);
            if (!convo || convo.type !== 'group') {
                alert("只能在群聊中发群红包。");
                return;
            }
            const title = prompt("请输入红包祝福语：", "恭喜发财，大吉大利");
            if (!title) return;
            const amountStr = prompt("请输入红包总金额：");
            const amount = parseFloat(amountStr);
            if(isNaN(amount) || amount <= 0) {
                alert("请输入有效的金额。");
                return;
            }
            const timeString = new Date(window.currentGameDate).toISOString().slice(0, 16);
            const timestamp = promptForTimestamp('请输入发送时间 (格式 YYYY-MM-DDTHH:mm)', timeString);
            if (!timestamp) return;

            const packetData = { title, amount, senderId: userProfile.id, timestamp };
            const packetEntry = { type: 'red_packet', sender: 'user', content: packetData, conversationId: convo.id, id: `msg-pending-${Date.now()}` };
            
            const grabEvents = simulateRedPacketGrab(convo.id, 'user', amount);
            
            blmxManager.addEntry(packetEntry);
            grabEvents.forEach(event => blmxManager.addEntry(event));

            blmxManager.persistLogToStorage();
            renderChatHistory(currentConversationId);
            togglePanel(null);
        }},
        { 
            label: '转发', 
            icon: 'fas fa-share-alt', 
            action: () => {
                enterForwardMode();
                togglePanel(null);
            } 
        },
        { 
            label: '长截图', 
            icon: 'fas fa-camera-retro', 
            action: () => {
                takeLongScreenshot();
                togglePanel(null);
            } 
        },
    ];

    function renderPlusPanel() {
        plusPanel.innerHTML = `
            <div class="features-grid active" id="plus-grid-page1"></div>
            <div class="features-grid" id="plus-grid-page2" style="display:none;"></div>
            <div class="panel-pagination">
                <div class="panel-dot active" data-page="1"></div>
                <div class="panel-dot" data-page="2"></div>
            </div>`;
        renderFeatureGrid(plusPanel.querySelector('#plus-grid-page1'), PLUS_FEATURES_PAGE1);
        renderFeatureGrid(plusPanel.querySelector('#plus-grid-page2'), PLUS_FEATURES_PAGE2);
        
        plusPanel.querySelectorAll('.panel-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const page = e.target.dataset.page;
                plusPanel.querySelectorAll('.features-grid').forEach(grid => grid.style.display = 'none');
                plusPanel.querySelector(`#plus-grid-page${page}`).style.display = 'grid';
                plusPanel.querySelectorAll('.panel-dot').forEach(d => d.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    function togglePanel(panelToShow) {
        const panelContainer = document.getElementById('panel-container');
        const currentActivePanel = document.querySelector('.panel-view.active');
        const isActive = panelContainer.classList.contains('active');
        
        if (isActive && currentActivePanel && currentActivePanel.id.startsWith(panelToShow)) {
            panelContainer.classList.remove('active');
            currentActivePanel.classList.remove('active');
        } else if (panelToShow) {
            if(panelToShow === 'char-sticker') {
                renderFeatureGrid(charStickerGrid, CHAR_STICKER_FEATURES.get());
            }
            if (currentActivePanel) currentActivePanel.classList.remove('active');
            document.getElementById(`${panelToShow}-panel`).classList.add('active');
            if (!isActive) panelContainer.classList.add('active');
        } else {
            if (isActive) panelContainer.classList.remove('active');
            if (currentActivePanel) currentActivePanel.classList.remove('active');
        }
    }

    function toggleStickerDeleteMode(gridElement, storageKey, featureProvider) {
        const panel = gridElement.closest('.panel-view');
        const isCurrentlyDeleteMode = gridElement.classList.contains('sticker-delete-mode');
        const existingConfirmBar = panel.querySelector('.delete-confirm-bar');
        if(existingConfirmBar) existingConfirmBar.remove();

        if (isCurrentlyDeleteMode) {
            gridElement.classList.remove('sticker-delete-mode');
            renderFeatureGrid(gridElement, featureProvider.get());
        } else {
            gridElement.classList.add('sticker-delete-mode');
            renderFeatureGrid(gridElement, featureProvider.get());

            const confirmBar = document.createElement('div');
            confirmBar.className = 'delete-confirm-bar';
            confirmBar.style.cssText = 'position: absolute; bottom: 0; left: 0; right: 0; padding: 0.625rem; background: rgba(247,247,247,0.9); display: flex; justify-content: center; align-items: center; gap: 1rem; border-top: 1px solid #E2E2E2;';

            const confirmButton = document.createElement('button');
            confirmButton.textContent = '确认删除选中项';
            confirmButton.style.cssText = 'padding: 0.5rem 1rem; border: none; border-radius: 0.3125rem; background-color: #E53935; color: white; cursor: pointer; font-size: 0.9em;';

            const cancelButton = document.createElement('button');
            cancelButton.textContent = '取消';
            cancelButton.style.cssText = 'padding: 0.5rem 1rem; border: none; border-radius: 0.3125rem; background-color: #757575; color: white; cursor: pointer; font-size: 0.9em;';

            confirmBar.appendChild(cancelButton);
            confirmBar.appendChild(confirmButton);
            panel.appendChild(confirmBar);

            cancelButton.onclick = () => {
                toggleStickerDeleteMode(gridElement, storageKey, featureProvider);
            };

            confirmButton.onclick = () => {
                const labelsToDelete = [];
                gridElement.querySelectorAll('.sticker-checkbox:checked').forEach(cb => {
                    labelsToDelete.push(cb.dataset.stickerLabel);
                });

                if (labelsToDelete.length === 0) {
                    alert("请至少选择一个要删除的表情包。");
                    return;
                }

                if (confirm(`确定要删除选中的 ${labelsToDelete.length} 个表情包吗？`)) {
                    const currentStickers = JSON.parse(localStorage.getItem(storageKey) || '[]');
                    const updatedStickers = currentStickers.filter(s => !labelsToDelete.includes(s.label));
                    localStorage.setItem(storageKey, JSON.stringify(updatedStickers));
                    alert("删除成功！");
                    toggleStickerDeleteMode(gridElement, storageKey, featureProvider);
                }
            };
        }
    }

    function renderFeatureGrid(gridElement, features) {
        gridElement.innerHTML = '';
        const isDeleteMode = gridElement.classList.contains('sticker-delete-mode');
        
        features.forEach(feature => {
            const item = document.createElement('div');
            item.className = 'feature-item';
            
            let iconHtml;
            if (feature.isAddBtn) {
                iconHtml = `<div class="feature-icon"><i class="fas fa-${feature.label === '添加' ? 'plus' : 'trash-alt'}"></i></div>`;
            } else if (feature.icon.startsWith('fas ')) {
                iconHtml = `<div class="feature-icon"><i class="${feature.icon}"></i></div>`;
            } else {
                iconHtml = `<div class="feature-icon"><img src="${feature.icon}" alt="${feature.label}"></div>`;
            }
            
            item.innerHTML = `${iconHtml}<span class="feature-label">${feature.label}</span>`;

            if (isDeleteMode && !feature.isAddBtn && !feature.isDefault) {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'sticker-checkbox';
                checkbox.dataset.stickerLabel = feature.label;
                item.appendChild(checkbox);

                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    checkbox.checked = !checkbox.checked;
                });
            } else {
                item.addEventListener('click', feature.action);
            }
            
            gridElement.appendChild(item);
        });
    }

    function promptForTimestamp(promptText, defaultText) {
        const dateTimeInput = prompt(promptText, defaultText.replace(' ', 'T'));
        if (!dateTimeInput || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateTimeInput)) {
            if (dateTimeInput) alert("格式错误，请输入 YYYY-MM-DDTHH:mm 格式。");
            return null;
        }
        return dateTimeInput;
    }

     function applyCurrentChatWallpaper() {
        const convo = conversations.find(c => c.id === currentConversationId);
        const chatBody = document.querySelector('#wechat-chat-view .wechat-body');

        if (convo && convo.wallpaper) {
            applyWallpaper(chatBody, convo.wallpaper, '');
        } else {
            const globalWallpaper = localStorage.getItem(WALLPAPER_KEYS.chat);
            applyWallpaper(chatBody, globalWallpaper, '');
        }
    }

    function applyWallpaper(viewElement, url, defaultBg) {
        if (url) {
            viewElement.style.backgroundImage = `url("${url}")`;
            viewElement.style.backgroundColor = 'transparent';
        } else {
            viewElement.style.backgroundImage = 'none';
            viewElement.style.backgroundColor = defaultBg || 'var(--wechat-bg)';
        }
    }

    function createWallpaperChangeHandler(storageKey, isPrivate = false) {
        return function(e) {
            e.preventDefault();
            let currentUrl = '';
            let convoId = null;

            if (isPrivate) {
                convoId = e.currentTarget.dataset.convoId;
                const convo = conversations.find(c => c.id === convoId);
                if (!convo) return;
                currentUrl = convo.wallpaper || '';
            } else {
                currentUrl = localStorage.getItem(storageKey) || '';
            }
            
            const newUrl = prompt('请输入壁纸的URL链接 (留空则恢复默认):', currentUrl);

            if (newUrl !== null) {
                if (newUrl.trim() === '') {
                    if (isPrivate) {
                        const convo = conversations.find(c => c.id === convoId);
                        delete convo.wallpaper;
                    } else {
                        localStorage.removeItem(storageKey);
                    }
                    alert('壁纸已恢复默认。');
                } else {
                    try {
                        new URL(newUrl); 
                        if (isPrivate) {
                            const convo = conversations.find(c => c.id === convoId);
                            convo.wallpaper = newUrl;
                        } else {
                            localStorage.setItem(storageKey, newUrl);
                        }
                        alert('壁纸已更新！');
                    } catch (_) {
                        alert('请输入一个有效的URL。');
                    }
                }
                saveData();
                applyCurrentChatWallpaper();
            }
        };
    }
    
    function renderConversationList() {
        const listEl = document.getElementById('conversation-list');
        listEl.innerHTML = '';
        
        if (!conversations.find(c => c.id === 'moments_feed')) {
             conversations.unshift({ id: 'moments_feed', type: 'system', name: '朋友圈', members: [], unread: 0, lastActivity: 0, pinned: false });
        }
        
        const sortedConversations = [...conversations].sort((a, b) => {
            const aIsPinned = a.pinned || false;
            const bIsPinned = b.pinned || false;

            if (aIsPinned !== bIsPinned) {
                return aIsPinned ? -1 : 1;
            }
            
            return (b.lastActivity || 0) - (a.lastActivity || 0);
        });

        if (sortedConversations.length === 1 && sortedConversations[0].id === 'moments_feed') {
            listEl.innerHTML = '<p style="text-align:center; color:#999; margin-top: 2rem;">还没有聊天，快去添加朋友吧！</p>';
            return;
        }

        sortedConversations.forEach(convo => {
            if (convo.dissolved && !convo.archived) return;

            const item = document.createElement('div');
            item.className = 'conversation-item';
            item.dataset.conversationId = convo.id;
            if (convo.pinned) {
                item.classList.add('pinned');
            }

            let avatarSrc, name;
            if(convo.id === 'moments_feed') {
                avatarSrc = 'https://files.catbox.moe/bialj8.jpeg';
                name = '朋友圈';
            } else if (convo.type === 'group') {
                avatarSrc = convo.avatar || 'https://files.catbox.moe/bialj8.jpeg';
                name = `${convo.name} (${convo.members.length})`;
                if(convo.dissolved) name += " (已解散)";
            } else {
                const otherMemberId = convo.members.find(m => m !== 'user');
                avatarSrc = getAvatar(otherMemberId);
                name = getDisplayName(otherMemberId, convo.id);
            }
            
            let lastMessageText = '';
            
            if (convo.id === 'moments_feed') {
                const lastInteraction = [...blmxManager.logEntries].reverse().find(e => {
                    if ((e.key === 'CHAR_LIKE' || e.key === 'CHAR_COMMENT') && e.data.author !== 'user') {
                        const allMomentEntries = blmxManager.logEntries.map((me, i) => ({...me, originalIndex: i})).filter(me => me.key === 'MOMENT');
                        const targetPost = allMomentEntries[parseInt(e.data.target_post_id, 10)];
                        return targetPost && (targetPost.data.author === 'user' || targetPost.data.author === '{{user}}');
                    }
                    return false;
                
                const lastMomentByOther = [...blmxManager.logEntries].reverse().find(e => e.key === 'MOMENT' && e.data.author !== 'user');

                if (lastInteraction) {
                    const actorName = getDisplayName(lastInteraction.data.author, null);
                    lastMessageText = lastInteraction.key === 'CHAR_LIKE'
                        ? `[${actorName}] 赞了你的动态`
                        : `[${actorName}] 评论了你的动态`;
                } else if (lastMomentByOther) {
                    lastMessageText = `[${getDisplayName(lastMomentByOther.data.author, null)}] 发布了新动态`;
                } else {
                    lastMessageText = "还没有新动态";
                }

            } else {
                const lastMessage = [...blmxManager.logEntries, ...userMessageQueue].reverse().find(e => {
                    const convoId = e.conversationId || e.convoId || (e.content && e.content.convoId) || (e.data && e.data.convoId);
                    return convoId === convo.id && (e.type || e.key) && !['time'].includes(e.type);
                });
                if(lastMessage) {
                    const senderId = lastMessage.sender || (lastMessage.data ? lastMessage.data.author : '');
                    const senderName = getDisplayName(senderId, convo.id);
                    const prefix = (senderId === 'user' || senderId === '{{user}}') ? '你: ' : (convo.type === 'group' && !convo.userIsObserver ? `${senderName}: ` : '');
                    switch(lastMessage.type || lastMessage.key) {
                        case 'message': lastMessageText = prefix + lastMessage.content; break;
                        case 'forward': lastMessageText = prefix + `[${lastMessage.data.title || '聊天记录'}]`; break;
                        case 'group_event': lastMessageText = `[系统消息] ${getGroupEventDescription(lastMessage.content)}`; break;
                        case 'event_log': lastMessageText = `[系统消息]`; break;
                        case 'image': lastMessageText = prefix + '[图片]'; break;
                        case 'voice': lastMessageText = prefix + '[语音]'; break;
                        case 'red_packet': lastMessageText = prefix + '[红包] ' + lastMessage.content.title; break;
                        default: lastMessageText = prefix + `[${lastMessage.type || lastMessage.key}]`;
                    }
                }
            }
            
            const lastActivityDate = convo.lastActivity ? new Date(convo.lastActivity) : null;
            const timeText = lastActivityDate ? formatMomentTimestamp(lastActivityDate.toISOString().replace('T', ' ')) : '';
            const unreadCount = convo.unread || 0;

            item.innerHTML = `
                <div class="convo-avatar-container">
                    <img src="${avatarSrc}" class="convo-avatar">
                    ${unreadCount > 0 ? `<div class="unread-badge">${unreadCount}</div>` : ''}
                </div>
                <div class="convo-details">
                    <div class="convo-top-line">
                        <div class="convo-name">${name}</div>
                        <div class="convo-time">${timeText}</div>
                    </div>
                    <div class="convo-last-message">${lastMessageText.substring(0, 30)}</div>
                </div>
            `;
            
            item.addEventListener('click', () => {
                navigateTo('wechatChat', { conversationId: convo.id });
            });
            
            addLongPressListener(item, (e) => {
                showConversationContextMenu(convo.id, e);
            });

            listEl.appendChild(item);
        });
    }
    
    function updateAppBadge() {
        const totalUnread = conversations.reduce((sum, convo) => sum + (convo.unread || 0), 0);
        const badge = document.getElementById('wechat-app-badge');
        if (totalUnread > 0) {
            badge.textContent = totalUnread > 99 ? '99+' : totalUnread;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    function showConversationContextMenu(conversationId, event) {
        const existingMenu = document.querySelector('.context-menu');
        if (existingMenu) existingMenu.remove();
        const existingBackdrop = document.querySelector('.context-menu-backdrop');
        if(existingBackdrop) existingBackdrop.remove();

        const conversation = conversations.find(c => c.id === conversationId);
        if (!conversation) return;

        const menu = document.createElement('div');
        menu.className = 'context-menu';
        
        let menuItems = '';
        if (conversation.id !== 'moments_feed') {
            const pinOptionText = conversation.pinned ? '取消置顶' : '置顶消息';
            menuItems += `<div class="context-menu-item" data-action="pin">${pinOptionText}</div>`;
        }
        menuItems += `<div class="context-menu-item" data-action="read">标为已读</div>`;
         if (conversation.userIsObserver || conversation.type !== 'system') {
             menuItems += `<div class="context-menu-item" data-action="delete" style="color:red;">删除此聊天</div>`;
        }


        menu.innerHTML = menuItems;
        
        const backdrop = document.createElement('div');
        backdrop.className = 'context-menu-backdrop';
        document.body.appendChild(backdrop);
        document.body.appendChild(menu);

        const x = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
        const y = event.type.includes('touch') ? event.touches[0].clientY : event.clientY;
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
        
        const cleanup = () => {
            menu.remove();
            backdrop.remove();
        };

        backdrop.addEventListener('click', cleanup);
        menu.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (action === 'pin') {
                conversation.pinned = !conversation.pinned;
            } else if (action === 'read') {
                conversation.unread = 0;
            } else if (action === 'delete') {
                if (confirm(`确定要删除这个聊天吗？此操作不可恢复。`)) {
                    const convoIndex = conversations.findIndex(c => c.id === conversationId);
                    if (convoIndex > -1) conversations.splice(convoIndex, 1);
                    blmxManager.logEntries = blmxManager.logEntries.filter(entry => entry.conversationId !== conversationId);
                    blmxManager.persistLogToStorage();
                }
            }
            saveData();
            renderConversationList();
            updateAppBadge();
            cleanup();
        });
    }
    
    function assignConversationsToLogEntries() {
        blmxManager.logEntries.forEach(entry => {
            if (entry.conversationId || entry.convoId) {
                return;
            }

            if (!entry.sender) return;
            const sender = entry.sender;
            if (sender === 'user') return;

            const potentialConvos = conversations.filter(c => c.members.includes(sender));
            
            if (potentialConvos.length === 1) {
                entry.conversationId = potentialConvos[0].id;
            } else if (potentialConvos.length > 1) {
                const singleChat = potentialConvos.find(c => c.type === 'single');
                entry.conversationId = singleChat ? singleChat.id : potentialConvos[0].id;
            } else {
                 console.warn(`[BLMX History] Could not find a conversation for old log entry from sender '${sender}'.`);
            }
        });
        console.log("[BLMX] Finished assigning conversations to historical logs.");
    }


    function setupEventListeners() {
        document.getElementById('app-wechat').addEventListener('click', () => navigateTo('wechatList'));
        document.getElementById('app-settings').addEventListener('click', () => navigateTo('settings'));
        
        document.getElementById('nav-chat').addEventListener('click', () => navigateTo('wechatList'));
        document.getElementById('nav-me').addEventListener('click', () => navigateTo('me'));
        document.getElementById('nav-chat-from-me').addEventListener('click', () => navigateTo('wechatList'));
        document.getElementById('nav-me-from-me').addEventListener('click', () => navigateTo('me'));

        document.getElementById('chat-back-btn').addEventListener('click', () => navigateTo('wechatList'));
        document.getElementById('settings-back-btn').addEventListener('click', () => navigateTo('home'));
        document.getElementById('group-settings-back-btn').addEventListener('click', () => navigateTo('wechatChat', {conversationId: document.getElementById('group-settings-view').dataset.conversationId}));
        document.getElementById('contact-details-back-btn').addEventListener('click', () => navigateTo('wechatList'));
        document.getElementById('wechat-list-back-btn').addEventListener('click', () => navigateTo('home'));
        
        document.getElementById('dynamic-island').addEventListener('click', () => {
            if (isGenerating) return;
            triggerAiResponse(true); 
        });

        document.getElementById('chat-options-btn').addEventListener('click', () => {
            const conversation = conversations.find(c => c.id === currentConversationId);
            if (conversation.type === 'single') {
                const otherMemberId = conversation.members.find(m => m !== 'user');
                navigateTo('contactDetails', { contactId: otherMemberId });
            } else if (conversation.type === 'group') {
                navigateTo('groupSettings', { conversationId: currentConversationId });
            }
        });
        
        document.getElementById('me-view-moments-btn').addEventListener('click', () => {
            navigateTo('moments');
        });

        document.getElementById('me-profile-card').addEventListener('click', () => updateAvatar('user'));
        
        document.getElementById('contact-details-avatar').addEventListener('click', (e) => {
            const contactId = e.target.dataset.contactId;
            if (contactId) {
                navigateTo('moments', { authorId: contactId });
            }
        });

        document.getElementById('moments-back-btn').addEventListener('click', () => {
            navigateTo('wechatList');
        });

        sendBtn.addEventListener('click', () => {
            if (isGenerating) return;
            const text = wechatInput.value.trim();
            if (text) {
                stageAndDisplayEntry({ type: 'message', sender: 'user', content: text });
                wechatInput.value = '';
                const convo = conversations.find(c => c.id === currentConversationId);
                if(convo) convo.lastActivity = Date.now();
                saveData();
                renderConversationList();
                updateFooterButtonsState();
                delete drafts[currentConversationId];
                return;
            }
            
            if (userMessageQueue.length > 0 || hasPendingNotifications) {
                triggerAiResponse(true);
            }
        });
        
        document.getElementById('hidden-send-trigger').addEventListener('click', () => {
             if (isGenerating) return;
             triggerAiResponse(true);
        });
        
        wechatInput.addEventListener('keydown', (e) => { 
            if (e.key === 'Enter' && !e.shiftKey) { 
                e.preventDefault();
                const text = wechatInput.value.trim();
                if (text) {
                     stageAndDisplayEntry({ type: 'message', sender: 'user', content: text });
                     wechatInput.value = '';
                     const convo = conversations.find(c => c.id === currentConversationId);
                     if(convo) convo.lastActivity = Date.now();
                     saveData();
                     renderConversationList();
                     updateFooterButtonsState();
                     delete drafts[currentConversationId];
                }
            } 
        });

        wechatInput.addEventListener('input', updateFooterButtonsState);
        wechatInput.addEventListener('focus', () => togglePanel(null));

        addLongPressListener(wechatInput, () => {
            const currentPlaceholder = wechatInput.placeholder;
            const newPlaceholder = prompt("请输入新的输入框提示文字:", currentPlaceholder);
            if (newPlaceholder !== null) {
                localStorage.setItem(`blmx_input_placeholder_${currentCharId}`, newPlaceholder);
                wechatInput.placeholder = newPlaceholder;
                alert('提示文字已更新！');
            }
        }, { duration: 5000, preventDefault: false });

        document.getElementById('smile-btn').addEventListener('click', () => togglePanel('sticker'));
        plusBtn.addEventListener('click', () => togglePanel('plus'));
        document.getElementById('microphone-btn').addEventListener('click', () => {
            const text = prompt('请输入语音内容:');
            if (text) {
                let durationStr = prompt('请输入语音秒数 (只输入数字):');
                if (durationStr) {
                    const duration = parseInt(durationStr, 10);
                    if (!isNaN(duration) && duration > 0) {
                        stageAndDisplayEntry({ type: 'voice', sender: 'me', content: { text: text, duration: duration } });
                    } else {
                        alert('请输入有效的秒数。');
                    }
                }
            }
        });
        
        const plusMenuBtn = document.getElementById('wechat-plus-btn');
        const plusMenu = document.getElementById('plus-menu');
        plusMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            plusMenu.style.display = plusMenu.style.display === 'block' ? 'none' : 'block';
        });
        document.body.addEventListener('click', (e) => {
             if (plusMenu.style.display === 'block' && !plusMenu.contains(e.target) && e.target !== plusMenuBtn) {
                 plusMenu.style.display = 'none';
             }
        });
        
        document.getElementById('plus-menu-add-friend').addEventListener('click', () => {
            const name = prompt("请输入要添加的朋友的真实姓名（这将作为唯一ID）：");
            if (name && name.trim()) {
                const friendId = name.trim();
                if (contacts.some(c => c.id === friendId) || friendId === 'user') {
                    alert("该联系人已存在或名字非法！");
                    return;
                }
                const newContact = {
                    id: friendId,
                    name: friendId,
                    avatar: prompt("请输入朋友的头像URL (可选):") || '',
                    signature: '',
                    cover: '',
                };
                contacts.push(newContact);
                
                const newConversation = {
                    id: `convo_single_${friendId}`,
                    type: 'single',
                    members: ['user', newContact.id],
                    unread: 0,
                    pinned: false,
                    lastActivity: Date.now()
                };
                conversations.push(newConversation);
                
                saveData();
                renderConversationList();
                alert(`"${newContact.name}" 已添加！`);
            }
        });

        document.getElementById('plus-menu-group-chat').addEventListener('click', () => {
            if (contacts.length < 1) {
                alert("请至少添加一个朋友才能发起群聊！");
                return;
            }
            const modal = document.getElementById('group-chat-modal');
            const listContainer = document.getElementById('group-chat-contact-list-container');
            listContainer.innerHTML = '';
            document.getElementById('group-chat-modal-title').textContent = "选择联系人";
            document.getElementById('group-chat-modal-footer').style.display = 'block';
            document.getElementById('group-chat-confirm-btn').style.display = 'none';
            contacts.forEach(contact => {
                const item = document.createElement('div');
                item.className = 'group-chat-contact-item';
                item.innerHTML = `
                    <input type="checkbox" id="gc-contact-${contact.id}" data-contact-id="${contact.id}">
                    <img src="${getAvatar(contact.id)}" alt="${getDisplayName(contact.id, null)}">
                    <label for="gc-contact-${contact.id}">${getDisplayName(contact.id, null)}</label>
                `;
                listContainer.appendChild(item);
            });
            modal.dataset.mode = "create";
            modal.style.display = 'flex';
        });
        
        document.getElementById('group-chat-cancel-btn').addEventListener('click', () => {
            document.getElementById('group-chat-modal').style.display = 'none';
        });

        document.getElementById('group-chat-create-btn').addEventListener('click', () => {
            const selectedContactIds = [];
            document.querySelectorAll('#group-chat-contact-list-container input:checked').forEach(checkbox => {
                selectedContactIds.push(checkbox.dataset.contactId);
            });
            
            const groupNameInput = document.getElementById('group-chat-name-input');
            const groupName = groupNameInput.value.trim();

            if (selectedContactIds.length < 1) {
                    alert("请至少选择一个联系人来创建群聊。");
                    return
                }
                if (!groupName) {
                    alert("请为群聊起一个名字。");
                    return;
                }
                
                const userJoins = confirm("您是否要加入这个群聊？\n(选择“是/OK”正常加入)\n(选择“否/Cancel”将以上帝视角观察)");

                if (userJoins) {
                    createGroup(groupName, selectedContactIds, 'user', false);
                } else {
                    showOwnerSelectionModal(groupName, selectedContactIds);
                }
            });
            
            function showOwnerSelectionModal(groupName, memberIds) {
                document.getElementById('group-chat-modal').style.display = 'none';
                const ownerModal = document.getElementById('group-owner-modal');
                const ownerList = document.getElementById('group-owner-list-container');
                ownerList.innerHTML = '';

                memberIds.forEach((id, index) => {
                    const item = document.createElement('div');
                    item.className = 'group-owner-item';
                    item.innerHTML = `
                         <input type="radio" name="group-owner" id="owner-${id}" value="${id}" ${index === 0 ? 'checked' : ''}>
                         <img src="${getAvatar(id)}" alt="${getDisplayName(id, null)}">
                         <label for="owner-${id}">${getDisplayName(id, null)}</label>
                    `;
                    ownerList.appendChild(item);
                });

                ownerModal.style.display = 'flex';
                
                document.getElementById('group-owner-confirm-btn').onclick = () => {
                    const selectedOwner = ownerList.querySelector('input[name="group-owner"]:checked');
                    if (selectedOwner) {
                        createGroup(groupName, memberIds, selectedOwner.value, true);
                        ownerModal.style.display = 'none';
                    } else {
                        alert("请选择一位群主！");
                    }
                };
            }

            function createGroup(name, members, ownerId, isObserver) {
                 const finalMembers = isObserver ? [...members] : ['user', ...members];
                 if (!finalMembers.includes(ownerId)) {
                     finalMembers.push(ownerId);
                 }
                 const uniqueMembers = [...new Set(finalMembers)];
                 
                 const newGroupId = generateDescriptiveGroupId(uniqueMembers);

                const newConversation = {
                    id: newGroupId, type: 'group', name: name, members: uniqueMembers,
                    owner: ownerId, admins: [],
                    avatar: '', unread: 0, pinned: false, lastActivity: Date.now(),
                    userIsObserver: isObserver, dissolved: false, nicknames: {}
                };
                
                const eventData = {
                    type: 'create',
                    convoId: newGroupId,
                    author: ownerId, 
                    timestamp: new Date().toISOString().substring(0, 16).replace('T', ' ')
                };
                
                blmxManager.addEntry({type: 'group_event', content: eventData });
                
                conversations.push(newConversation);
                saveData();
                blmxManager.persistLogToStorage().then(() => {
                    renderConversationList();
                    document.getElementById('group-chat-name-input').value = '';
                    document.getElementById('group-chat-modal').style.display = 'none';
                    navigateTo('wechatChat', { conversationId: newConversation.id });
                });
            }


            document.getElementById('post-moment-btn').addEventListener('click', () => {
                let text = prompt("这一刻的想法...");
                if (text === null) return;

                let image = "", image_type = "none";
                if (confirm("是否要附带图片？")) {
                    const isUrl = confirm("图片是链接吗？(点击“确定”输入链接，点击“取消”输入描述)");
                    image_type = isUrl ? "url" : "desc";
                    image = prompt(isUrl ? "请输入图片链接:" : "请输入图片描述:");
                    if (!image) { image = ""; image_type = "none"; }
                }
                
                if (!text.trim() && !image.trim()) {
                     alert("不能发布空的朋友圈内容。");
                     return;
                }

                const defaultTime = new Date(window.currentGameDate).toISOString().slice(0, 16);
                const timestamp = promptForTimestamp("请输入发布时间 (格式 YYYY-MM-DDTHH:mm)", defaultTime);
                if (!timestamp) return;
                
                const isPrivate = confirm("是否发布为私密朋友圈？");
                let visibleTo = [], invisibleTo = [];

                if (!isPrivate && confirm("是否要设置部分可见/不可见？")) {
                    const mode = confirm("设置为“部分可见”吗？\n(OK = 部分可见, Cancel = 不给谁看)");
                    const ids_str = prompt(`请输入联系人ID，用英文逗号分隔:`);
                    if(ids_str) {
                        const ids = ids_str.split(',').map(s => s.trim()).filter(Boolean);
                        if (mode) {
                            visibleTo = ids;
                        } else {
                            invisibleTo = ids;
                        }
                    }
                }
                
                const momentData = {author: 'user', text, image, image_type, timestamp, isPrivate, visibleTo, invisibleTo };
                blmxManager.addEntry({key: 'MOMENT', data: momentData });
                renderMomentsFeed(currentMomentsAuthorId);
                blmxManager.persistLogToStorage();
            });
            
            momentsFeedList.addEventListener('click', (e) => {
                const postEl = e.target.closest('.moment-post');
                if (!postEl) return;
                
                const postAuthorId = postEl.dataset.authorId;
                const logId = parseInt(postEl.dataset.postId, 10);
                const momentEntry = blmxManager.logEntries[logId];
                if(!momentEntry) return;

                const allMomentPosts = blmxManager.logEntries.map((entry,index)=>({...entry,originalIndex:index})).filter(e=>e.key==='MOMENT');
                const sequencePostId = allMomentPosts.findIndex(p => p.originalIndex === logId);

                if (e.target.closest('.forward-button:not(.disabled)')) {
                    const momentIdForForward = `moment_${logId}`;
                    showForwardTargetModal([momentIdForForward], 'forward');
                } else if (e.target.closest('.private-icon') && postAuthorId === 'user') {
                     if (confirm("要将这条私密动态公开吗？")) {
                         momentEntry.data.isPrivate = false;
                         blmxManager.persistLogToStorage();
                         renderMomentsFeed(currentMomentsAuthorId);
                     }
                } else if (e.target.closest('.visibility-icon')) {
                     const { visibleTo, invisibleTo } = momentEntry.data;
                     let alertMsg = '可见性设置：\n';
                     if (visibleTo && visibleTo.length > 0) alertMsg += `部分可见: ${visibleTo.map(id => getDisplayName(id, null)).join(', ')}\n`;
                     if (invisibleTo && invisibleTo.length > 0) alertMsg += `不给谁看: ${invisibleTo.map(id => getDisplayName(id, null)).join(', ')}\n`;
                     alert(alertMsg);
                } else if (e.target.closest('.delete-moment-btn')) {
                    alert("删除功能待更新");
                } else if (e.target.closest('.comment-button:not(.disabled)')) {
                    if (isNaN(sequencePostId)) return;
                    const action = prompt("输入 '赞' 来点赞，或者直接输入评论内容:");
                    if(action) {
                        const key = (action.trim().toLowerCase() === '赞' || action.trim().toLowerCase() === 'like') ? 'CHAR_LIKE' : 'CHAR_COMMENT';
                        const data = { author: 'user', target_post_id: sequencePostId };
                        if (key === 'CHAR_COMMENT') data.text = action;
                        blmxManager.addEntry({key, data});

                        renderMomentsFeed(currentMomentsAuthorId);
                        hasPendingNotifications = true;
                        updateFooterButtonsState();
                        blmxManager.persistLogToStorage();
                    }
                }
            });
            
            wechatBody.addEventListener('click', (e) => {
                if (e.target.matches('.message-avatar')) {
                    const senderId = e.target.dataset.senderId;
                    if (!senderId) return;

                    const convo = conversations.find(c => c.id === currentConversationId);
                    if (convo && convo.type === 'single' && senderId !== 'user') {
                        updateAvatar(senderId);
                    } else if (convo && convo.type === 'group' && senderId !== 'user' && !convo.userIsObserver) {
                        const atText = `@${getDisplayName(senderId, convo.id)} `;
                        wechatInput.value += atText;
                        wechatInput.focus();
                    }
                }
            });
            
            document.getElementById('delete-contact-btn').addEventListener('click', (e) => {
                const profileCard = e.target.closest('#contact-details-view').querySelector('#contact-details-profile-card');
                const contactId = profileCard.dataset.contactId;
                const contact = contacts.find(c => c.id === contactId);
                if (!contact) return;
                
                const choice = prompt("请选择删除方式：\n1. 真删除 (清除所有记录)\n2. 假删除", "1");
                if (choice === '1') {
                    if (confirm(`【真删除】确定要删除联系人 "${getDisplayName(contact.id, null)}" 吗？\n此操作将清除与该联系人的所有聊天记录，不可恢复。`)) {
                        contacts = contacts.filter(c => c.id !== contactId);
                        const convosToDelete = conversations.filter(convo => convo.type === 'single' && convo.members.includes(contactId));
                        const convoIdsToDelete = convosToDelete.map(c => c.id);
                        conversations = conversations.filter(convo => !convoIdsToDelete.includes(convo.id));
                        blmxManager.logEntries = blmxManager.logEntries.filter(entry => !convoIdsToDelete.includes(entry.conversationId));
                        
                        conversations.forEach(convo => {
                            if (convo.type === 'group' && convo.members.includes(contactId)) {
                                 convo.members = convo.members.filter(id => id !== contactId);
                            }
                        });

                        saveData();
                        blmxManager.persistLogToStorage();
                        alert(`联系人 "${getDisplayName(contact.id, null)}" 已被彻底删除。`);
                        navigateTo('wechatList');
                    }
                } else if (choice === '2') {
                    alert("作者BLMX还没做完这个功能，敬请期待");
                }
            });

            document.getElementById('contact-name-header').addEventListener('click', (e) => {
                 const convo = conversations.find(c => c.id === currentConversationId);
                 if (!convo || convo.type !== 'single') return;
                 
                 const otherMemberId = convo.members.find(m => m !== 'user');
                 const contact = contacts.find(c => c.id === otherMemberId);
                 if(!contact) return;

                 const currentRemark = contact.remark || '';
                 const newRemark = prompt(`为 "${contact.name}" 设置备注:`, currentRemark);
                 if (newRemark !== null) {
                    contact.remark = newRemark.trim();
                    saveData();
                    e.target.textContent = getDisplayName(otherMemberId, convo.id);
                    renderConversationList();
                 }
            });

            document.getElementById('moments-user-name').addEventListener('click', () => {
                const currentName = document.getElementById('moments-user-name').textContent;
                const targetId = document.getElementById('moments-user-avatar').src === getAvatar('user') ? 'user' : contacts.find(c => getDisplayName(c.id, null) === currentName)?.id;

                if (targetId === 'user') {
                    const newName = prompt('请输入你的新名字:', userProfile.name);
                    if (newName && newName.trim() && newName !== userProfile.name) {
                        userProfile.name = newName.trim();
                        saveData();
                        renderMomentsFeed('user'); 
                        alert('名字已更新！');
                    }
                } else {
                    const contact = contacts.find(c => c.id === targetId);
                    if(contact) {
                        alert(`你不能修改 ${contact.name} 的名字。`);
                    }
                }
            });


            document.getElementById('moments-user-avatar').addEventListener('click', () => {
                const currentName = document.getElementById('moments-user-name').textContent;
                const targetId = document.getElementById('moments-user-avatar').src === getAvatar('user') ? 'user' : contacts.find(c => getDisplayName(c.id, null) === currentName)?.id;
                const targetObject = targetId === 'user' ? userProfile : contacts.find(c => c.id === targetId);
                
                if (targetObject) {
                    const currentSignature = targetObject.signature || '';
                    const newSignature = prompt('请输入个性签名:', currentSignature);
                    if (newSignature !== null) {
                        targetObject.signature = newSignature;
                        saveData();
                        renderMomentsFeed(targetObject.id);
                    }
                }
            });

            document.getElementById('delete-mode-trigger').addEventListener('click', () => {
                const wechatView = document.getElementById('wechat-chat-view');
                wechatView.classList.toggle('delete-mode');
                if (wechatView.classList.contains('delete-mode')) {
                    alert('已进入删除模式。点击任意消息或时间戳可将其删除。再次点击左上角可退出。');
                } else {
                    alert('已退出删除模式。');
                }
            });

            wechatBody.addEventListener('click', (e) => {
                const wechatView = document.getElementById('wechat-chat-view');
                if (!wechatView.classList.contains('delete-mode')) {
                    return;
                }
                
                const targetRow = e.target.closest('[data-log-index]');
                if (targetRow) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const indexToDelete = parseInt(targetRow.dataset.logIndex, 10);
                    let previewText = targetRow.textContent.trim().replace(/\s+/g, ' ').substring(0, 50);

                    if (confirm(`确定要删除这条记录吗？\n\n预览: "${previewText}..."`)) {
                        blmxManager.logEntries.splice(indexToDelete, 1);
                        blmxManager.persistLogToStorage();
                        renderChatHistory(currentConversationId); 
                        renderMomentsFeed(currentMomentsAuthorId); 
                    }
                }
            }, true);

            document.getElementById('image-upload-input').addEventListener('change', e => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = readerEvent => {
                        const imageUrl = readerEvent.target.result;
                        try {
                            stageAndDisplayEntry({ 
                                type: 'image', 
                                sender: 'me', 
                                content: { 
                                    type: 'url', 
                                    value: imageUrl
                                } 
                            });
                            togglePanel(null);
                        } catch (err) {
                            alert('图片太大无法发送，请选择一张小一点的图片。');
                            console.error("Error with image:", err);
                        }
                    };
                    reader.readAsDataURL(file);
                }
                e.target.value = null;
            });
            
            document.getElementById('group-settings-avatar-btn').addEventListener('click', () => {
                 const convoId = document.getElementById('group-settings-view').dataset.conversationId;
                 const convo = conversations.find(c => c.id === convoId);
                 if(!convo) return;
                 const newAvatar = prompt("请输入新的群聊头像URL:", convo.avatar || '');
                 if(newAvatar !== null) {
                    convo.avatar = newAvatar;
                    saveData();
                    renderConversationList();
                    alert("群头像已更新。");
                 }
            });
            document.getElementById('group-settings-name-item').addEventListener('click', () => {
                 const convoId = document.getElementById('group-settings-view').dataset.conversationId;
                 const convo = conversations.find(c => c.id === convoId);
                 if(!convo || convo.userIsObserver) return;
                 const newName = prompt("请输入新的群聊名称:", convo.name);
                 if(newName && newName.trim()) {
                    const eventData = { type: 'rename', convoId: convo.id, author: userProfile.id, newName: newName.trim(), timestamp: new Date(window.currentGameDate).toISOString().substring(0, 16).replace('T', ' ') };
                    blmxManager.addEntry({type: 'group_event', content: eventData});
                    addGroupEventToWeChat(eventData);
                    convo.name = newName.trim();
                    convo.lastActivity = Date.now();
                    blmxManager.persistLogToStorage();
                    saveData();
                    document.getElementById('group-settings-name').textContent = convo.name;
                    document.getElementById('contact-name-header').textContent = `${convo.name} (${convo.members.length})`;
                 }
            });

            document.getElementById('group-settings-member-grid').addEventListener('click', (e) => {
                const memberItem = e.target.closest('.group-member-item');
                const addBtn = e.target.closest('.add-member-btn');
                const convoId = document.getElementById('group-settings-view').dataset.conversationId;
                const convo = conversations.find(c => c.id === convoId);
                if (!convo) return;

                if(addBtn) {
                     if (convo.userIsObserver) { alert("你不能向这个群里添加成员。"); return; }
                     showForwardTargetModal([], 'addMember');
                     return;
                }

                if(memberItem) {
                    if (convo.userIsObserver) { return; }
                    const memberId = memberItem.dataset.memberId;
                    const actorId = 'user'; 
                    if (memberId === actorId) return;

                    const actorIsOwner = convo.owner === actorId;
                    const actorIsAdmin = convo.admins && convo.admins.includes(actorId);
                    const targetIsOwner = convo.owner === memberId;
                    const targetIsAdmin = convo.admins && convo.admins.includes(memberId);

                    let promptText = `对 "${getDisplayName(memberId, convoId)}" 执行操作：\n1. 禁言\n2. 踢出群聊\n3. 解除禁言\n4. 修改群昵称`;
                    if (actorIsOwner) {
                        promptText += targetIsAdmin ? `\n5. 取消管理员` : `\n5. 设为管理员`;
                    }
                    
                    const action = prompt(promptText, "");
                    const nowTimestamp = new Date(window.currentGameDate).toISOString().substring(0, 16).replace('T', ' ');

                    let eventData = { convoId: convo.id, author: userProfile.id, targetId: memberId, timestamp: nowTimestamp };
                    let shouldLog = false;
                    
                    if (action === '1') {
                        if (!actorIsOwner && !actorIsAdmin) { alert("你没有权限禁言成员。"); return; }
                        if (targetIsOwner || (actorIsAdmin && targetIsAdmin && !actorIsOwner)) { alert("你不能禁言群主或其他管理员。"); return; }
                        const duration = parseInt(prompt("输入禁言时长（分钟）:", "10"), 10);
                        if (isNaN(duration) || duration <= 0) { alert("请输入有效的禁言时长。"); return; }
                        if(!convo.muted) convo.muted = {};
                        convo.muted[memberId] = new Date(new Date(nowTimestamp.replace(' ', 'T')).getTime() + duration * 60000).toISOString();
                        eventData.type = 'mute'; eventData.duration = duration; shouldLog = true;
                    } else if (action === '2') {
                        if (!actorIsOwner && !actorIsAdmin) { alert("你没有权限移出成员。"); return; }
                        if (targetIsOwner || (actorIsAdmin && targetIsAdmin && !actorIsOwner)) { alert("你不能移出群主或其他管理员。"); return; }
                        if (confirm(`确定要将 "${getDisplayName(memberId, convoId)}" 移出群聊吗？`)) {
                            convo.members = convo.members.filter(id => id !== memberId);
                            eventData.type = 'kick'; 
                            shouldLog = true;
                        }
                    } else if (action === '3') {
                         if (!actorIsOwner && !actorIsAdmin) { alert("你没有权限解除禁言。"); return; }
                         if (!convo.muted || !convo.muted[memberId]) { alert(`${getDisplayName(memberId, convoId)} 未被禁言。`); return; }
                         delete convo.muted[memberId];
                         eventData.type = 'unmute'; shouldLog = true;
                    } else if (action === '4') {
                         const oldName = getDisplayName(memberId, convo.id);
                         const newNickname = prompt(`为 "${oldName}" 设置群昵称:`, oldName);
                         if (newNickname !== null) {
                            if (!convo.nicknames) convo.nicknames = {};
                            convo.nicknames[memberId] = newNickname.trim();
                            eventData.type = 'nickname_change'; 
                            eventData.oldName = oldName;
                            eventData.newName = newNickname.trim(); 
                            shouldLog = true;
                         }
                    } else if (action === '5' && actorIsOwner) {
                        if (!convo.admins) convo.admins = [];
                        if (targetIsAdmin) {
                            convo.admins = convo.admins.filter(id => id !== memberId);
                            eventData.type = 'unset_admin';
                        } else {
                            convo.admins.push(memberId);
                            eventData.type = 'set_admin';
                        }
                        shouldLog = true;
                    }
                    
                    if (shouldLog) {
                        blmxManager.addEntry({type: 'group_event', content: eventData});
                        renderChatHistory(currentConversationId); 
                        blmxManager.persistLogToStorage();
                        saveData();
                        navigateTo('groupSettings', { conversationId: convo.id });
                    }
                }
            });
            
            document.getElementById('group-chat-confirm-btn').addEventListener('click', () => {
                 const modal = document.getElementById('group-chat-modal');
                 const mode = modal.dataset.mode;

                 if (mode === 'forward') {
                    const selectedTarget = modal.querySelector('input[name="forward-target"]:checked');
                    if (selectedTarget) {
                        const targetConvoId = selectedTarget.value;
                        const selectedMessageIds = JSON.parse(modal.dataset.messageIds);
                        
                        let fwdTitle = '聊天记录';
                        if (selectedMessageIds.length > 0 && selectedMessageIds[0].startsWith('moment_')) {
                             const momentIndex = parseInt(selectedMessageIds[0].replace('moment_', ''), 10);
                             const moment = blmxManager.logEntries[momentIndex];
                             fwdTitle = `转发的动态`;
                        } else {
                            const currentConvo = conversations.find(c => c.id === currentConversationId);
                            const otherMemberName = currentConvo.type === 'single' ? getDisplayName(currentConvo.members.find(m => m !== 'user'), currentConvo.id) : currentConvo.name;
                            fwdTitle = `“${getDisplayName('user', null)}”和“${otherMemberName}”的聊天记录`;
                        }
                        
                        const forwardData = {
                            title: fwdTitle,
                            messageIds: selectedMessageIds,
                        };
                        
                        exitForwardMode();
                        navigateTo('wechatChat', { conversationId: targetConvoId });
                        stageAndDisplayEntry({type: 'forward', sender: 'me', data: forwardData });
                        
                        modal.style.display = 'none';
                    } else {
                        alert("请选择一个转发目标。");
                    }
                 } else if(modal.dataset.mode === 'addMember') {
                     const convoId = modal.dataset.convoId;
                     const convo = conversations.find(c => c.id === convoId);
                     if(!convo) return;
                     
                     const selectedContactIds = [];
                    document.querySelectorAll('#group-chat-contact-list-container input:checked').forEach(checkbox => {
                        selectedContactIds.push(checkbox.dataset.contactId);
                    });
                    if(selectedContactIds.length === 0) {
                        alert("请至少选择一个要添加的成员。");
                        return;
                    }
                    convo.members.push(...selectedContactIds);
                    convo.lastActivity = Date.now();
                    
                    const eventData = { type: 'add', convoId: convoId, author: userProfile.id, targetIds: selectedContactIds, timestamp: new Date(window.currentGameDate).toISOString().substring(0, 16).replace('T', ' ') };
                    blmxManager.addEntry({type: 'group_event', content: eventData});
                    renderChatHistory(convoId);
                    blmxManager.persistLogToStorage();
                    saveData();
                    
                    modal.style.display = 'none';
                    navigateTo('groupSettings', {conversationId: convoId});
                } else if (modal.dataset.mode === 'selectRecipient') {
                     const selectedTarget = modal.querySelector('input[name="recipient-target"]:checked');
                     if(selectedTarget) {
                         const recipientId = selectedTarget.value;
                         const itemType = modal.dataset.itemType;
                         let itemData = JSON.parse(modal.dataset.itemData);
                         itemData.recipientId = recipientId;
                         stageAndDisplayEntry({type: itemType, sender: 'me', data: itemData});
                         modal.style.display = 'none';
                         togglePanel(null);
                     } else {
                         alert("请选择一个接收者。");
                     }
                }
            });
            document.getElementById('group-dissolve-btn').addEventListener('click', (e) => {
                const convoId = document.getElementById('group-settings-view').dataset.conversationId;
                const convo = conversations.find(c => c.id === convoId);
                if(!convo) return;
                const action = e.currentTarget.dataset.action;

                if (action === "dissolve") {
                    if (convo.owner !== 'user') { alert("你不是群主，无法解散该群。"); return; }
                    const keepHistory = confirm("是否保留此群聊的聊天记录？\n(选择“是/OK”将存档群聊，可恢复)\n(选择“否/Cancel”将彻底删除)");
                    if(keepHistory) {
                        convo.dissolved = true;
                        convo.archived = true;
                    } else {
                        const convoIndex = conversations.findIndex(c => c.id === convoId);
                        if (convoIndex > -1) conversations.splice(convoIndex, 1);
                        blmxManager.logEntries = blmxManager.logEntries.filter(entry => (entry.conversationId || entry.convoId) !== convoId);
                    }
                    
                    const eventData = { type: 'dissolve', convoId: convoId, author: userProfile.id, timestamp: new Date(window.currentGameDate).toISOString().substring(0, 16).replace('T', ' ') };
                    blmxManager.addEntry({type: 'group_event', content: eventData});
                    
                    blmxManager.persistLogToStorage();
                    saveData();
                    navigateTo('wechatList');

                } else if (action === 'recover') {
                    convo.dissolved = false;
                    convo.archived = false;
                    alert("群聊已恢复！");
                    saveData();
                    navigateTo('groupSettings', { conversationId: convo.id });

                } else if (action === "delete") {
                     const keepHistory = confirm("是否保留此群聊的聊天记录？\n(选择“是/OK”将仅删除聊天入口，记录保留)\n(选择“否/Cancel”将彻底删除聊天和记录)");
                     const convoIndex = conversations.findIndex(c => c.id === convoId);
                     if (convoIndex > -1) conversations.splice(convoIndex, 1);
                     
                     if (!keepHistory) {
                        blmxManager.logEntries = blmxManager.logEntries.filter(entry => (entry.conversationId || entry.convoId) !== convoId);
                        blmxManager.persistLogToStorage();
                     }
                     saveData();
                     navigateTo('wechatList');
                }
            });
            
            document.getElementById('observer-poke-btn').addEventListener('click', () => {
                 triggerAiResponse(true, true);
            });

            document.getElementById('observer-screenshot-btn').addEventListener('click', () => {
                takeLongScreenshot();
            });

            document.getElementById('set-private-chat-wallpaper-btn').addEventListener('click', createWallpaperChangeHandler(null, true));
            document.getElementById('change-chat-wallpaper-btn').addEventListener('click', createWallpaperChangeHandler(WALLPAPER_KEYS.chat, false));
            document.getElementById('change-home-wallpaper-btn').addEventListener('click', (e) => {
                e.preventDefault();
                const url = prompt("输入主屏幕壁纸URL:", localStorage.getItem(WALLPAPER_KEYS.home) || '');
                if(url !== null) {
                    localStorage.setItem(WALLPAPER_KEYS.home, url);
                    applyWallpaper(document.getElementById('app-homescreen'), url, "url('https://files.catbox.moe/bialj8.jpeg')");
                }
            });
            document.getElementById('group-settings-wallpaper-btn').addEventListener('click', createWallpaperChangeHandler(WALLPAPER_KEYS.chat, false));

            document.getElementById('forward-cancel-btn').addEventListener('click', exitForwardMode);
            document.getElementById('forward-confirm-btn').addEventListener('click', handleForwardConfirm);
            document.querySelector('#forward-content-modal .close-btn').addEventListener('click', () => {
                 document.getElementById('forward-content-modal').style.display = 'none';
            });
            const settingsView = document.getElementById('settings-view');
            if (settingsView) {
                settingsView.addEventListener('click', function(e) {
                    if (e.target.matches('.tutorial-container .toc a')) {
                        e.preventDefault();

                        const href = e.target.getAttribute('href');
                        const targetId = href.substring(1);
                        
                        const scrollContainer = document.querySelector('#settings-view .settings-body');
                        const targetElement = document.getElementById(targetId);

                        if (targetElement && scrollContainer) {
                            const targetPosition = targetElement.offsetTop;
                            
                            scrollContainer.scrollTo({
                                top: targetPosition - scrollContainer.offsetTop - 15, 
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            }
        }
        
        function generateDescriptiveGroupId(members) {
            const sortedMembers = [...members].sort();
            return `convo_group_${sortedMembers.join('-')}`;
        }

        function migrateGroupConversationIds() {
            let migrationNeeded = false;
            const idMap = {};

            conversations.forEach(convo => {
                if (convo.type === 'group' && /_(\d{13})$/.test(convo.id)) {
                    const oldId = convo.id;
                    const newId = generateDescriptiveGroupId(convo.members);
                    idMap[oldId] = newId;
                    convo.id = newId;
                    migrationNeeded = true;
                    console.log(`[BLMX ID Migration] Planning to migrate ${oldId} -> ${newId}`);
                }
            });

            if (migrationNeeded) {
                console.log("[BLMX ID Migration] Starting migration of log entries...");
                blmxManager.logEntries.forEach(entry => {
                    const convoId = entry.conversationId || entry.convoId || (entry.content && entry.content.convoId);
                    if (convoId && idMap[convoId]) {
                        if(entry.conversationId) entry.conversationId = idMap[convoId];
                        if(entry.convoId) entry.convoId = idMap[convoId];
                        if(entry.content && entry.content.convoId) entry.content.convoId = idMap[convoId];
                        if(entry.data && entry.data.convoId) entry.data.convoId = idMap[convoId];
                    }
                });
                console.log("[BLMX ID Migration] Migration complete. Saving changes.");
                saveData();
                blmxManager.persistLogToStorage();
            } else {
                console.log("[BLMX ID Migration] No old numeric group IDs found. No migration needed.");
            }
        }


        async function start() {
            try {
                console.log("[BLMX] Fetching SillyTavern info...");
                const parent = window.parent;
                window.currentGameDate = new Date();
                
                const charData = await parent.TavernHelper.getCharData();
                currentCharId = charData.name; 
                
                loadData(); 
                
                document.getElementById('me-view-avatar').src = getAvatar('user');
                document.getElementById('me-view-name').textContent = getDisplayName('user', null);
        
            } catch (error) {
                console.error("[BLMX] Failed to auto-load info from SillyTavern:", error);
                currentCharId = 'default_char';
                loadData();
            }
        
            tavernGenerateFunc = window.parent.TavernHelper.generate;
            blmxManager = new BLMX_Protocol(window.parent.TavernHelper, currentCharId);
            await blmxManager.initialize();

            migrateGroupConversationIds();
            
            assignConversationsToLogEntries();
            
            applyWallpaper(document.getElementById('app-homescreen'), localStorage.getItem(WALLPAPER_KEYS.home), "url('https://files.catbox.moe/bialj8.jpeg')");

            renderPlusPanel();
            renderFeatureGrid(stickerGrid, GLOBAL_STICKER_FEATURES.get());
            
            setupEventListeners();
            
            navigateTo('wechatList');
            updateAppBadge();
            updateFooterButtonsState();
        }
        
        function checkAndApplyMuteState() {
            const convo = conversations.find(c => c.id === currentConversationId);
            if(!convo) return;
            const inputField = document.getElementById('wechat-input-field');
            const footerIcons = document.querySelectorAll('.wechat-footer .footer-icon');
            
            const mutedInfo = convo.muted ? (convo.muted['user'] || convo.muted['{{user}}']) : null;
            if (mutedInfo && new Date() < new Date(mutedInfo)) {
                inputField.disabled = true;
                inputField.placeholder = "你已被禁言";
                footerIcons.forEach(icon => icon.style.pointerEvents = 'none');
            } else {
                inputField.disabled = false;
                inputField.placeholder = "发送信息";
                footerIcons.forEach(icon => icon.style.pointerEvents = 'auto');
            }
        }

        function showRecipientSelectionModal(itemType, itemData) {
            const modal = document.getElementById('group-chat-modal');
            const listContainer = document.getElementById('group-chat-contact-list-container');
            listContainer.innerHTML = '';
            document.getElementById('group-chat-modal-footer').style.display = 'none';
            document.getElementById('group-chat-confirm-btn').style.display = 'block';
            
            modal.dataset.mode = "selectRecipient";
            modal.dataset.itemType = itemType;
            modal.dataset.itemData = JSON.stringify(itemData);

            const convo = conversations.find(c => c.id === currentConversationId);
            if(!convo) return;
            
            document.getElementById('group-chat-modal-title').textContent = "选择一个接收者";
            convo.members.filter(id => id !== 'user').forEach(memberId => {
                const name = getDisplayName(memberId, convo.id);
                const avatarSrc = getAvatar(memberId);
                const item = document.createElement('div');
                item.className = 'group-owner-item';
                item.innerHTML = `<input type="radio" name="recipient-target" id="target-${memberId}" value="${memberId}"><img src="${avatarSrc}" alt="${name}"><label for="target-${memberId}">${name}</label>`;
                listContainer.appendChild(item);
            });

            modal.style.display = 'flex';
        }


        function enterForwardMode() {
            document.getElementById('wechat-chat-view').classList.add('forward-mode');
            document.querySelector('.wechat-input-area').style.display = 'none';
            document.getElementById('observer-mode-footer').style.display = 'none';
            document.getElementById('forward-action-bar').style.display = 'flex';
        }

        function exitForwardMode() {
            document.getElementById('wechat-chat-view').classList.remove('forward-mode');
            const convo = conversations.find(c => c.id === currentConversationId);
            if(convo) {
                if (convo.userIsObserver) {
                    document.querySelector('.wechat-input-area').style.display = 'none';
                    document.getElementById('observer-mode-footer').style.display = 'flex';
                } else {
                    document.querySelector('.wechat-input-area').style.display = 'block';
                    document.getElementById('observer-mode-footer').style.display = 'none';
                }
            }
            document.getElementById('forward-action-bar').style.display = 'none';
            document.querySelectorAll('.forward-checkbox').forEach(cb => cb.checked = false);
        }

        function handleForwardConfirm() {
            const selectedIds = [];
            document.querySelectorAll('.forward-checkbox:checked').forEach(cb => {
                selectedIds.push(cb.dataset.messageId);
            });

            if (selectedIds.length === 0) {
                alert("请至少选择一条要转发的记录。");
                return;
            }
            showForwardTargetModal(selectedIds, 'forward');
        }

        function showForwardTargetModal(data, mode) {
            const modal = document.getElementById('group-chat-modal');
            const listContainer = document.getElementById('group-chat-contact-list-container');
            listContainer.innerHTML = '';
            document.getElementById('group-chat-modal-footer').style.display = 'none';
            document.getElementById('group-chat-confirm-btn').style.display = 'block';
            modal.dataset.mode = mode;

            if(mode === 'forward') {
                modal.dataset.messageIds = JSON.stringify(data);
                document.getElementById('group-chat-modal-title').textContent = "选择一个聊天";
                
                conversations.filter(c => c.id !== 'moments_feed' && !c.userIsObserver).forEach(convo => {
                     let avatarSrc, name;
                     if (convo.type === 'group') {
                        avatarSrc = convo.avatar || 'https://files.catbox.moe/bialj8.jpeg';
                        name = `${convo.name} (${convo.members.length})`;
                    } else {
                        const otherMemberId = convo.members.find(m => m !== 'user');
                        avatarSrc = getAvatar(otherMemberId);
                        name = getDisplayName(otherMemberId, convo.id);
                    }

                    const item = document.createElement('div');
                    item.className = 'group-owner-item';
                    item.innerHTML = `<input type="radio" name="forward-target" id="target-${convo.id}" value="${convo.id}"><img src="${avatarSrc}" alt="${name}"><label for="target-${convo.id}">${name}</label>`;
                    listContainer.appendChild(item);
                });
            } else if (mode === 'addMember') {
                const convoId = document.getElementById('group-settings-view').dataset.conversationId;
                modal.dataset.convoId = convoId;
                const convo = conversations.find(c => c.id === convoId);
                document.getElementById('group-chat-modal-title').textContent = "邀请新成员";
                const contactsNotInGroup = contacts.filter(c => !convo.members.includes(c.id));
                contactsNotInGroup.forEach(contact => {
                    const item = document.createElement('div');
                    item.className = 'group-chat-contact-item';
                    item.innerHTML = `<input type="checkbox" id="gc-add-contact-${contact.id}" data-contact-id="${contact.id}"><img src="${getAvatar(contact.id)}"><label for="gc-add-contact-${contact.id}">${getDisplayName(contact.id, null)}</label>`;
                    listContainer.appendChild(item);
                });
            }

            modal.style.display = 'flex';
        }
        
        function renderForwardedContentModal(data) {
            const modal = document.getElementById('forward-content-modal');
            const body = document.getElementById('forward-content-modal-body');
            const title = modal.querySelector('.title');
            title.textContent = data.title;
            body.innerHTML = '';

            const messagesToRender = data.messageIds.map(id => blmxManager.logEntries.find(e => e.id === id)).filter(Boolean);

            messagesToRender.forEach(msg => {
                const item = document.createElement('div');
                item.className = 'forward-modal-item';
                
                const content = (typeof msg.content === 'object' && msg.type !== 'voice') ? `[${msg.type || '复合消息'}]` : (msg.content.text || msg.content);
                const timestamp = (msg.recalled_timestamp || (msg.data && msg.data.timestamp) || (msg.content && msg.content.timestamp)) 
                    ? formatMomentTimestamp((msg.recalled_timestamp || msg.data.timestamp || msg.content.timestamp)) 
                    : '';


                item.innerHTML = `
                    <div class="forward-modal-item-header">
                        <img src="${getAvatar(msg.sender)}" alt="">
                        <span class="name">${getDisplayName(msg.sender, msg.conversationId)}</span>
                        <span style="margin-left:auto; font-size: 0.8em; color: #999;">${timestamp}</span>
                    </div>
                    <div class="forward-modal-item-content">${content}</div>
                `;
                body.appendChild(item);
            });

            modal.style.display = 'flex';
        }

        function renderForwardedMomentModal(momentId) {
            const modal = document.getElementById('forward-content-modal');
            const body = document.getElementById('forward-content-modal-body');
            const title = modal.querySelector('.title');
            
            const momentIndex = parseInt(momentId.replace('moment_', ''), 10);
            const originalMoment = blmxManager.logEntries[momentIndex];
            if (!originalMoment || originalMoment.key !== 'MOMENT') return;
            
            title.textContent = "查看动态";
            body.innerHTML = '';
            
            renderMomentsFeed(null); 
            const originalPostElement = momentsFeedList.querySelector(`.moment-post[data-post-id="${momentIndex}"]`);
            if (originalPostElement) {
                const clonedPost = originalPostElement.cloneNode(true);
                const actionButtons = clonedPost.querySelector('.post-actions');
                if (actionButtons) actionButtons.remove();
                
                body.appendChild(clonedPost);
                modal.style.display = 'flex';
            }
            renderMomentsFeed(currentMomentsAuthorId);
        }
        
        function takeLongScreenshot() {
            const includeFrame = confirm("是否将手机外框一同截图？\n(是/OK = 包含外框, 否/Cancel = 仅聊天内容)");
            const panelContainer = document.getElementById('panel-container');
            const chatBody = document.querySelector('#wechat-chat-view .wechat-body');

            if (includeFrame) {
                const frame = document.querySelector('.phone-frame');
                alert("正在准备带外框截图，请稍候...");

                const wasPanelActive = panelContainer.classList.contains('active');
                if (wasPanelActive) {
                    panelContainer.style.display = 'none';
                }

                try {
                    html2canvas(frame, {
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: null, 
                    }).then(canvas => {
                        const link = document.createElement('a');
                        link.download = `截图-带外框-${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.png`;
                        link.href = canvas.toDataURL("image/png");
                        link.click();
                        alert("带框截图已生成并开始下载！");
                    }).catch(err => {
                        console.error("带框截图失败:", err);
                        alert("截图失败，详情请查看控制台。");
                    });
                } finally {
                    if (wasPanelActive) {
                        panelContainer.style.display = '';
                    }
                }
            } else {
                if (!chatBody) {
                    alert("无法找到聊天区域进行截图。");
                    return;
                }
                alert("正在准备长截图，请稍候... 页面可能会暂时变化。");

                const originalStyles = {
                    height: chatBody.style.height,
                    overflowY: chatBody.style.overflowY,
                };
                
                chatBody.scrollTop = 0;

                try {
                    chatBody.style.height = 'auto';
                    chatBody.style.overflowY = 'visible';
                    
                    html2canvas(chatBody, {
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: getComputedStyle(chatBody).backgroundColor,
                        width: chatBody.scrollWidth,
                        height: chatBody.scrollHeight,
                        windowWidth: chatBody.scrollWidth,
                        windowHeight: chatBody.scrollHeight
                    }).then(canvas => {
                        const link = document.createElement('a');
                        const convo = conversations.find(c => c.id === currentConversationId);
                        const convoName = convo ? (convo.name || getDisplayName(convo.members.find(m => m !== 'user'), convo.id)) : 'chat';
                        link.download = `长截图_${convoName}_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.png`;
                        link.href = canvas.toDataURL("image/png");
                        link.click();
                        alert("长截图已生成并开始下载！");
                    }).catch(err => {
                        console.error("长截图失败:", err);
                        alert("长截图失败，这通常是由于聊天背景图跨域（CORS）策略导致的。");
                    });

                } finally {
                    setTimeout(() => {
                        Object.assign(chatBody.style, originalStyles);
                        chatBody.scrollTop = chatBody.scrollHeight;
                        console.log("截图流程结束，UI已恢复。");
                    }, 200);
                }
            }
        }


        const waiterInterval = setInterval(() => {
            if (window.parent && window.parent.TavernHelper && typeof window.parent.TavernHelper.generate === 'function') {
                clearInterval(waiterInterval);
                console.log('[BLMX Proxy] Successfully connected to SillyTavern!');
                start();
            }
        }, 250);
    });