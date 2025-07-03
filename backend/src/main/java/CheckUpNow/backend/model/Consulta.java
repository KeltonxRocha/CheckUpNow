package checkupnow.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Consulta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;
    private LocalDate dia;
    private LocalTime horario;
    private String medico;
    private String local;
    private boolean ativo = true;

    // Construtores
    public Consulta() {
    }

    public Consulta(String tipo, LocalDate dia, LocalTime horario, String medico, String local) {
        this.tipo = tipo;
        this.dia = dia;
        this.horario = horario;
        this.medico = medico;
        this.local = local;
        this.ativo = true;
    }

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    // Getters e Setters
    public Long getId() {return id;}

    public String getTipo() {return tipo;}
    public void setTipo(String tipo) {this.tipo = tipo;}

    public LocalDate getDia() {return dia;}
    public void setDia(LocalDate dia) {this.dia = dia;}

    public LocalTime getHorario() {return horario;}
    public void setHorario(LocalTime horario) {this.horario = horario;}

    public String getMedico() {return medico;}
    public void setMedico(String medico) {this.medico = medico;}

    public String getLocal() {return local;}
    public void setLocal(String local) {this.local = local;}

    public boolean isAtivo() {return ativo;}
    public void setAtivo(boolean ativo) {this.ativo = ativo;}

    public Usuario getUsuario() {return usuario;}
    public void setUsuario(Usuario usuario) {this.usuario = usuario;}

    // Métodos
    public void cancelar() {
        this.ativo = false;
    }
}
