package com.voicenotesai.app;

import android.app.*;
import android.os.*;
import android.content.*;
import android.graphics.Color;
import android.speech.RecognizerIntent;
import android.view.*;
import android.widget.*;
import org.json.*;
import java.util.*;
import java.text.SimpleDateFormat;

public class MainActivity extends Activity {
  private static final int SPEECH=10, EXPORT=11;
  private final ArrayList<JSONObject> notes=new ArrayList<>();
  private LinearLayout root, items;
  private EditText editor;
  private int selected=-1;
  private final SimpleDateFormat fmt=new SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.forLanguageTag("pl-PL"));
  @Override public void onCreate(Bundle b){super.onCreate(b); load(); render();}
  private void load(){try {JSONArray a=new JSONArray(getPreferences(0).getString("notes","[]")); for(int i=0;i<a.length();i++)notes.add(a.getJSONObject(i));}catch(Exception ignored){}}
  private void save(){getPreferences(0).edit().putString("notes",new JSONArray(notes).toString()).apply();}
  private Button button(String label, Runnable r){Button b=new Button(this);b.setText(label);b.setOnClickListener(v->r.run());return b;}
  private void render(){
    ScrollView scroll=new ScrollView(this);root=new LinearLayout(this);root.setOrientation(1);root.setPadding(24,24,24,24);scroll.addView(root);setContentView(scroll);
    TextView title=new TextView(this);title.setText("Voice Notes AI 0.1");title.setTextSize(25);title.setTextColor(Color.BLACK);root.addView(title);
    TextView subtitle=new TextView(this);subtitle.setText("Notatki zapisane lokalnie na telefonie • Polski");root.addView(subtitle);
    editor=new EditText(this);editor.setHint("Treść notatki...");editor.setMinLines(4);editor.setGravity(Gravity.TOP);root.addView(editor);
    root.addView(button("🎙 Dyktuj po polsku",()->{try {Intent i=new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);i.putExtra(RecognizerIntent.EXTRA_LANGUAGE,"pl-PL");i.putExtra(RecognizerIntent.EXTRA_PROMPT,"Podyktuj notatkę");startActivityForResult(i,SPEECH);}catch(Exception e){toast("Brak usługi rozpoznawania mowy: "+e.getMessage());}}));
    root.addView(button("Zapisz notatkę",()->{String s=editor.getText().toString().trim();if(s.isEmpty()){toast("Wpisz lub podyktuj tekst");return;}try {JSONObject n=new JSONObject();n.put("date",fmt.format(new Date()));n.put("text",s);if(selected>=0)notes.set(selected,n);else notes.add(0,n);selected=-1;save();render();toast("Zapisano na telefonie");}catch(Exception e){toast("Błąd zapisu");}}));
    root.addView(button("Nowa notatka",()->{selected=-1;editor.setText("");}));
    root.addView(button("Eksportuj wszystkie do TXT",()->{Intent i=new Intent(Intent.ACTION_CREATE_DOCUMENT);i.setType("text/plain");i.addCategory(Intent.CATEGORY_OPENABLE);i.putExtra(Intent.EXTRA_TITLE,"VoiceNotesAI-notatki.txt");startActivityForResult(i,EXPORT);}));
    TextView h=new TextView(this);h.setText("Historia ("+notes.size()+")");h.setTextSize(20);root.addView(h);
    for(int j=0;j<notes.size();j++){final int index=j;JSONObject n=notes.get(j);String d=n.optString("date"),t=n.optString("text");root.addView(button(d+"\n"+(t.length()>120?t.substring(0,120)+"…":t),()->{selected=index;editor.setText(notes.get(index).optString("text"));editor.requestFocus();}));root.addView(button("Usuń ↑",()->new AlertDialog.Builder(this).setMessage("Usunąć notatkę?").setPositiveButton("Usuń",(di,w)->{notes.remove(index);selected=-1;save();render();}).setNegativeButton("Anuluj",null).show()));}
  }
  @Override protected void onActivityResult(int req,int result,Intent data){super.onActivityResult(req,result,data);if(result!=RESULT_OK||data==null)return;if(req==SPEECH){ArrayList<String> r=data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);if(r!=null&&!r.isEmpty())editor.setText((editor.getText().toString()+" "+r.get(0)).trim());}else if(req==EXPORT){try(java.io.OutputStream out=getContentResolver().openOutputStream(data.getData())){StringBuilder sb=new StringBuilder();for(JSONObject n:notes)sb.append(n.optString("date")).append("\n").append(n.optString("text")).append("\n\n");out.write(sb.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8));toast("Wyeksportowano TXT");}catch(Exception e){toast("Eksport nieudany: "+e.getMessage());}}}
  private void toast(String s){Toast.makeText(this,s,Toast.LENGTH_LONG).show();}
}
