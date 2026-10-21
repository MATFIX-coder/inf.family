// Мини-интерпретатор Python для Arcade — перенесён из inf.family.html (v1.4) без изменений.
// Понимает присваивания, print(), int()/str(), арифметику, индексы, срезы, count() и replace().
// Нет eval(), Function() и выполнения произвольного кода: только разбор этих конструкций.
(function () {
  const ArcadePython = (() => {
    const V=(value,type=typeof value==='string'?'str':'int')=>({value,type});
    const fail=message=>{throw new Error(message)};
    function indices(length,start,stop,step=1){
      if(!Number.isInteger(step)||step===0)fail('Шаг среза не может быть нулём.');
      const neg=step<0;
      const bound=(v,defaultValue)=>{
        if(v===null||v===undefined)return defaultValue;
        if(!Number.isInteger(v))fail('Индекс должен быть целым.');
        if(v<0)v+=length;
        return Math.max(neg?-1:0,Math.min(neg?length-1:length,v));
      };
      const a=bound(start,neg?length-1:0),b=bound(stop,neg?-1:length),out=[];
      for(let i=a;neg?i>b:i<b;i+=step)out.push(i);
      return out;
    }
    function format(v){if(v.type==='float'&&Number.isInteger(v.value))return v.value+'.0';return String(v.value)}
    function expr(source,env){
      const tokens=[];let i=0;
      while(i<source.length){
        if(/\s/.test(source[i])){i++;continue}
        const rest=source.slice(i),m=rest.match(/^(?:\d+(?:\.\d+)?|[A-Za-z_][A-Za-z_0-9]*|\*\*|\/\/)/);
        if(source[i]==="'"||source[i]==='"'){
          const quote=source[i++];let s='',closed=false;
          while(i<source.length){const c=source[i++];if(c===quote){closed=true;break}if(c==='\\'){const n=source[i++];s+=n==='n'?'\n':n==='t'?'\t':n==='r'?'\r':n}else s+=c}
          if(!closed)fail('Закрой кавычки строки.');tokens.push({kind:'str',value:s});continue;
        }
        if(m){tokens.push({kind:'token',value:m[0]});i+=m[0].length;continue}
        if('+-*/%().[],:'.includes(source[i])){tokens.push({kind:'token',value:source[i++]});continue}
        fail('Проверь символы в выражении.');
      }
      let p=0;const peek=()=>tokens[p]?.kind==='str'?undefined:tokens[p]?.value;const take=x=>{if(peek()!==x)fail('Ожидается '+x);p++};
      const num=v=>{if(!['int','float'].includes(v.type))fail('Для этой операции нужно число.');return v.value};
      function atom(){
        const t=tokens[p++];if(!t)fail('Выражение не закончено.');
        if(t.kind==='str')return V(t.value);
        if(/^\d/.test(t.value))return V(Number(t.value),t.value.includes('.')?'float':'int');
        if(t.value==='('){const v=sum();take(')');return v}
        if(['int','str'].includes(t.value)&&peek()==='('){take('(');const v=sum();take(')');if(t.value==='str')return V(format(v));if(v.type==='str'&&!/^[+-]?\d+$/.test(v.value.trim()))fail('int ожидает строку с целым числом.');return V(v.type==='str'?Number(v.value.trim()):Math.trunc(num(v)))}
        if(Object.hasOwn(env,t.value))return env[t.value];fail('Переменная '+t.value+' ещё не определена.');
      }
      function postfix(){
        let v=atom();
        while(peek()==='['||peek()==='.'){
          if(v.type!=='str')fail('Индексы и строковые методы применяются к строке.');
          if(peek()==='['){
            take('[');let a=null,b=null,c=1;
            if(peek()!==':')a=num(sum());
            if(peek()===':'){take(':');if(peek()!==':'&&peek()!==']')b=num(sum());if(peek()===':'){take(':');if(peek()!==']')c=num(sum())}take(']');v=V(indices(v.value.length,a,b,c).map(k=>v.value[k]).join(''))}
            else{take(']');if(!Number.isInteger(a))fail('Индекс должен быть целым.');const k=a<0?v.value.length+a:a;if(k<0||k>=v.value.length)fail('Индекс выходит за границы строки.');v=V(v.value[k])}
          }else{
            take('.');const method=peek();p++;if(!['count','replace'].includes(method))fail('Используй count или replace.');take('(');const args=[sum()];while(peek()===','){take(',');args.push(sum())}take(')');
            if(method==='count'){
              if(args.length!==1||args[0].type!=='str')fail('count ожидает одну строку.');const sub=args[0].value;let n=0,pos=0;
              if(sub==='')n=v.value.length+1;else while((pos=v.value.indexOf(sub,pos))>=0){n++;pos+=sub.length}v=V(n);
            }else{
              if(args.length<2||args.length>3||args[0].type!=='str'||args[1].type!=='str')fail('replace: нужны old, new и необязательное число замен.');
              const old=args[0].value,replacement=args[1].value,limit=args.length===3?num(args[2]):-1;
              if(!Number.isInteger(limit))fail('Число замен должно быть целым.');let n=0,pos=0,out='',s=v.value;
              if(old===''){for(let k=0;k<=s.length;k++){if(limit<0||n<limit){out+=replacement;n++}out+=s[k]||''}}
              else{while(limit<0||n<limit){const k=s.indexOf(old,pos);if(k<0)break;out+=s.slice(pos,k)+replacement;pos=k+old.length;n++}out+=s.slice(pos)}v=V(out);
            }
          }
        }
        return v;
      }
      function power(){let v=postfix();if(peek()==='**'){take('**');const w=unary();const result=num(v)**num(w);v=V(result,w.value<0||v.type==='float'||w.type==='float'?'float':'int')}return v}
      function unary(){if(peek()==='+'||peek()==='-'){const s=peek();p++;const v=unary();return V((s==='-'?-1:1)*num(v),v.type)}return power()}
      function apply(a,op,b){
        if(op==='+'&&a.type==='str'&&b.type==='str')return V(a.value+b.value);
        if(op==='*'&&(a.type==='str'||b.type==='str')){const text=a.type==='str'?a:b,n=a.type==='str'?b:a;if(n.type!=='int')fail('Для повторения строки нужно целое число.');if(text.value.length*Math.max(0,n.value)>5000)fail('Строка слишком длинная.');return V(text.value.repeat(Math.max(0,n.value)))}
        const x=num(a),y=num(b);if(['/', '//','%'].includes(op)&&y===0)fail('Деление на ноль.');
        const z=op==='+'?x+y:op==='-'?x-y:op==='*'?x*y:op==='/'?x/y:op==='//'?Math.floor(x/y):x-Math.floor(x/y)*y;
        return V(z,op==='/'||a.type==='float'||b.type==='float'?'float':'int');
      }
      function product(){let v=unary();while(['*','/','//','%'].includes(peek())){const op=peek();p++;v=apply(v,op,unary())}return v}
      function sum(){let v=product();while(['+','-'].includes(peek())){const op=peek();p++;v=apply(v,op,product())}return v}
      const value=sum();if(p!==tokens.length)fail('Проверь конец выражения.');if(typeof value.value==='number'&&!Number.isFinite(value.value))fail('Число слишком большое.');if(String(value.value).length>5000)fail('Строка слишком длинная.');return value;
    }
    function run(code){
      if(code.length>4000)fail('Программа слишком длинная.');const env=Object.create(null),out=[];
      const lines=code.split('\n').filter(x=>x.trim()&&!x.trim().startsWith('#'));if(lines.length>40)fail('Слишком много строк.');
      for(const line of lines){
        const s=line.trim(),assignment=s.match(/^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$/),print=s.match(/^print\s*\((.*)\)\s*$/);
        if(assignment){if(['int','str','print'].includes(assignment[1]))fail('Выбери другое имя переменной.');env[assignment[1]]=expr(assignment[2],env)}
        else if(print)out.push(format(expr(print[1],env)));else fail('Используй присваивания и print().');
      }
      return out.join('\n');
    }
    return {indices,run,expr,format};
  })();
  (window.INF = window.INF || {}).ArcadePython = ArcadePython;
})();
