(self.webpackChunkWebexComponents=self.webpackChunkWebexComponents||[]).push([[5793,3047,2227],{93205:e=>{"use strict";function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,r,i){if(t.language===a){var s=t.tokenStack=[];t.code=t.code.replace(r,(function(e){if("function"==typeof i&&!i(e))return e;for(var r,o=s.length;-1!==t.code.indexOf(r=n(a,o));)++o;return s[o]=e,r})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var r=0,i=Object.keys(t.tokenStack);!function s(o){for(var l=0;l<o.length&&!(r>=i.length);l++){var p=o[l];if("string"==typeof p||p.content&&"string"==typeof p.content){var c=i[r],u=t.tokenStack[c],g="string"==typeof p?p:p.content,d=n(a,c),f=g.indexOf(d);if(f>-1){++r;var h=g.substring(0,f),m=new e.Token(a,e.tokenize(u,t.grammar),"language-"+a,u),b=g.substring(f+d.length),k=[];h&&k.push.apply(k,s([h])),k.push(m),b&&k.push.apply(k,s([b])),"string"==typeof p?o.splice.apply(o,[l,1].concat(k)):p.content=k}}else p.content&&s(p.content)}return o}(t.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]},5137:(e,n,t)=>{"use strict";var a=t(88262);function r(e){e.register(a),e.languages.insertBefore("php","variable",{this:/\$this\b/,global:/\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,scope:{pattern:/\b[\w\\]+::/,inside:{keyword:/static|self|parent/,punctuation:/::|\\/}}})}e.exports=r,r.displayName="phpExtras",r.aliases=[]},88262:(e,n,t)=>{"use strict";var a=t(93205);function r(e){e.register(a),function(e){e.languages.php=e.languages.extend("clike",{keyword:/\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,boolean:{pattern:/\b(?:false|true)\b/i,alias:"constant"},constant:[/\b[A-Z_][A-Z0-9_]*\b/,/\b(?:null)\b/i],comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,lookbehind:!0}}),e.languages.insertBefore("php","string",{"shell-comment":{pattern:/(^|[^\\])#.*/,lookbehind:!0,alias:"comment"}}),e.languages.insertBefore("php","comment",{delimiter:{pattern:/\?>$|^<\?(?:php(?=\s)|=)?/i,alias:"important"}}),e.languages.insertBefore("php","keyword",{variable:/\$+(?:\w+\b|(?={))/i,package:{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/,lookbehind:!0,inside:{punctuation:/\\/}}}),e.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/,lookbehind:!0}});var n={pattern:/{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,lookbehind:!0,inside:{rest:e.languages.php}};e.languages.insertBefore("php","string",{"nowdoc-string":{pattern:/<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,greedy:!0,alias:"string",inside:{delimiter:{pattern:/^<<<'[^']+'|[a-z_]\w*;$/i,alias:"symbol",inside:{punctuation:/^<<<'?|[';]$/}}}},"heredoc-string":{pattern:/<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,greedy:!0,alias:"string",inside:{delimiter:{pattern:/^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,alias:"symbol",inside:{punctuation:/^<<<"?|[";]$/}},interpolation:n}},"single-quoted-string":{pattern:/'(?:\\[\s\S]|[^\\'])*'/,greedy:!0,alias:"string"},"double-quoted-string":{pattern:/"(?:\\[\s\S]|[^\\"])*"/,greedy:!0,alias:"string",inside:{interpolation:n}}}),delete e.languages.php.string,e.hooks.add("before-tokenize",(function(n){/<\?/.test(n.code)&&e.languages["markup-templating"].buildPlaceholders(n,"php",/<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#)(?:[^?\n\r]|\?(?!>))*|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/gi)})),e.hooks.add("after-tokenize",(function(n){e.languages["markup-templating"].tokenizePlaceholders(n,"php")}))}(e)}e.exports=r,r.displayName="php",r.aliases=[]}}]);