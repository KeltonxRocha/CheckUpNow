package checkupnow.backend.model;
import jakarta.persistence.*;

@Entity
public class Usuario{
    @Id
    @GeneratedValue
    private long id;

    //Dados//
    private String nome;
    private String email;
    private String senha;
    private String sexo;
    private String telefone;
    private String datanascimento;

    //Construtores//
    public Usuario(){}

    public Usuario(String nome, String email, String senha, String sexo, String telefone, String datanascimento){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.sexo = sexo;
        this.telefone = telefone;
        this.datanascimento = datanascimento; 
    }

    //getters e setters// 
    public String getNome() {return nome;}
    public void setNome(String nome) {this.nome = nome;}
    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
    public String getSenha() {return senha;}
    public void setSenha(String senha) {this.senha = senha;}
    public String getSexo() {return sexo;}
    public void setSexo(String sexo) {this.sexo = sexo;}
    public String getTelefone() {return telefone;}
    public void setTelefone(String telefone) {this.telefone = telefone;}
    public String getDatanascimento() {return datanascimento;}
    public void setDatanascimento(String datanascimento) {this.datanascimento = datanascimento;}   
}